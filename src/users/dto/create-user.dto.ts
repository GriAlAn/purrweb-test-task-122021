import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({example: 'user@gmail.com', description: 'E-mail'})
  @IsString({message: 'Must be string'})
  @IsEmail({}, {message: 'Must be correct e-mail'})
  readonly email: string;

  @ApiProperty({example: 'password', description: 'Password'})
  @IsString({message: 'Must be string'})
  @Length(4, 16, {message: 'Must be minimum 4 or maximum 16 characters'})
  readonly password: string;
}
