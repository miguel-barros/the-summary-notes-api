import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginUserDTO } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(loginUserDTO: LoginUserDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginUserDTO.email.toLowerCase(),
      },
    });

    if (!user) {
      throw new BadRequestException({
        message: 'Email/Password invalid',
      });
    }

    if (!(await bcrypt.compare(loginUserDTO.password, user.password))) {
      throw new BadRequestException({
        message: 'Email/Password invalid',
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    return {
      ...rest,
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }
}
