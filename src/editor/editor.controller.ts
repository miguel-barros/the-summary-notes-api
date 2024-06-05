import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { EditorService } from './editor.service';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateEditorDto } from './dto/create-editor.dto';

@ApiTags('Editor')
@Controller('editor')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class EditorController {
  constructor(private readonly editorService: EditorService) {}

  @ApiResponse({
    status: 200,
    description: 'The records has been successfully retrieved.',
    type: [CreateEditorDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Get()
  async findAll(@Req() req: Express.Request) {
    try {
      return await this.editorService.findAll(req.user.id);
    } catch (error: unknown) {
      console.error(error);
      return error;
    }
  }
}
