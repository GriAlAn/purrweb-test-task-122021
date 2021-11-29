import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({example: 'Comment body', description: 'Body for comment'})
  @IsNotEmpty({message: 'Must not be empty'})
  @MaxLength(200, {message: 'Must no be longer than 200 characters'})
  readonly body: string;
}