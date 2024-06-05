import { Module } from '@nestjs/common';
import { EditorService } from './editor.service';
import { EditorController } from './editor.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EditorController],
  providers: [EditorService, PrismaService],
})
export class EditorModule {}
