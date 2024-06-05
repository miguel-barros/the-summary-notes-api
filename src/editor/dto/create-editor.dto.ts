import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEditorDto {
  @ApiProperty({
    description: 'The content of the editor',
    example: '<p>Content of the editor</p>',
  })
  @IsNotEmpty()
  content: string;
}
