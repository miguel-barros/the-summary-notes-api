import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaErrorHandler, PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IUser } from './dto/return-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<
    IUser & {
      accessToken: string;
    }
  > {
    try {
      const encryptedPassword = await bcrypt.hash(data.password, 10);
      data['password'] = encryptedPassword;
      data['email'] = data.email.toLowerCase();

      const user = await this.prisma.user.create({
        data,
      });

      user['accessToken'] = this.jwtService.sign({ id: user.id });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return {
        ...(result as IUser & { accessToken: string }),
      };
    } catch (error) {
      PrismaErrorHandler(error);
      return error;
    }
  }

  async findOne(idOrEmail: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            id: idOrEmail,
          },
          {
            email: idOrEmail.toLowerCase(),
          },
        ],
      },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }

    return user;
  }

  async findMany(query: string): Promise<IUser[]> {
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return users as IUser[];
  }
}
