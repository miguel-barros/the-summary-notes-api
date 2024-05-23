import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty({
    example: 'user@email.com',
    description: 'Email do usuário',
    type: String,
  })
  @IsNotEmpty({
    message: 'O email é obrigatório',
  })
  @IsEmail(
    {},
    {
      message: 'O email deve ser um email válido',
    },
  )
  email: string;

  @ApiProperty({
    example: '@Pass123',
    description: 'Senha do usuário',
    type: String,
  })
  @IsNotEmpty({
    message: 'A senha é obrigatória',
  })
  password: string;
}
