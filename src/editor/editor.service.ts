import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateEditorDto } from './dto/update-editor.dto';

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

  async update(
    userId: string,
    editorId: string,
    updateEditorDTO: UpdateEditorDto,
  ) {
    const editor = await this.prisma.editor.findUnique({
      where: {
        id: editorId,
        userId,
      },
    });

    if (!editor) {
      throw new NotFoundException({
        message: 'Editor not found',
      });
    }

    return await this.prisma.editor.update({
      where: {
        id: editorId,
      },
      data: updateEditorDTO,
    });
  }
}
