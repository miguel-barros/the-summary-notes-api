import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    type: String,
    description: 'User name',
  })
  @IsNotEmpty({
    message: 'The name is required',
  })
  name: string;

  @ApiProperty({
    example: 'user@email.com',
    type: String,
    description: 'User email',
  })
  @IsNotEmpty({
    message: 'The email is required',
  })
  @IsEmail(
    {},
    {
      message: 'The email is invalid',
    },
  )
  email: string;

  @ApiProperty({
    example: '@Pass123',
    type: String,
    description: 'User password',
  })
  @IsNotEmpty({
    message: 'The password is required',
  })
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'The password must contain at least 6 characters with: uppercase letters, lowercase letters, numbers and special characters',
    },
  )
  password: string;
}
