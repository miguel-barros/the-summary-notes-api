import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

export function PrismaErrorHandler(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new BadRequestException({
          message: `The unique key(s) [${error.meta.target}] is already in use`,
        });
      case 'P2025':
        throw new NotFoundException({
          message: error.message,
        });
      default:
        console.error(error);
        throw new InternalServerErrorException({
          message: 'Error completing the operation',
          error: error,
        });
    }
  }

  if (error instanceof PrismaClientValidationError) {
    throw new UnprocessableEntityException({
      message: 'Fill in the fields correctly',
    });
  }

  throw new InternalServerErrorException({
    message: 'Error completing the operation',
    error: error,
  });
}
