import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EditorService } from './editor.service';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateEditorDto } from './dto/create-editor.dto';
import { UpdateEditorDto } from './dto/update-editor.dto';

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
    return await this.editorService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
    type: CreateEditorDto,
  })
  @ApiNotFoundResponse({
    description: 'Editor not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async findOne(@Param('id') editorId: string, @Req() req: Express.Request) {
    return await this.editorService.findOne(req.user.id, editorId);
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CreateEditorDto,
  })
  @ApiNotFoundResponse({
    description: 'Editor not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Patch(':id')
  async update(
    @Body() updateEditorDTO: UpdateEditorDto,
    @Param('id') editorId: string,
    @Req() req: Express.Request,
  ) {
    return await this.editorService.update(
      req.user.id,
      editorId,
      updateEditorDTO,
    );
  }
}
