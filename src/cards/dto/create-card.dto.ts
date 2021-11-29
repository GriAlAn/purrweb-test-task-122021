import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({example: 'Card title', description: 'Title for card'})
  @IsNotEmpty({message: 'Must not be empty'})
  @MaxLength(50, {message: 'Must no be longer than 50 characters'})
  readonly title: string;

  @ApiProperty({example: 'Card body', description: 'Body for card'})
  @IsNotEmpty({message: 'Must not be empty'})
  @MaxLength(200, {message: 'Must no be longer than 200 characters'})
  readonly body: string;
}