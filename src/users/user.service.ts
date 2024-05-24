import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaErrorHandler, PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/types/user';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(data: UserInterface): Promise<
    UserInterface & {
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
        ...(result as UserInterface & { accessToken: string }),
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
}
