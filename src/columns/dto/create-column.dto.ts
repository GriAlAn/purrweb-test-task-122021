import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({example: 'Column title', description: 'Title for column'})
  readonly title: string
}