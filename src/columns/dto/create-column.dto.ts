import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({example: 'Column title', description: 'Title for column'})
  @IsNotEmpty({message: 'Must not be empty'})
  readonly title: string;
}