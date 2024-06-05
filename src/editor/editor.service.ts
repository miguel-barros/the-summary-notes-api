import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EditorService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    const firstEditor = await this.prisma.editor.findFirst({
      where: {
        userId,
      },
    });

    if (!firstEditor) {
      const editor = await this.prisma.editor.create({
        data: {
          content: '',
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return [editor];
    }

    const editors = await this.prisma.editor.findMany({
      where: {
        userId,
      },
    });

    return editors;
  }
}
