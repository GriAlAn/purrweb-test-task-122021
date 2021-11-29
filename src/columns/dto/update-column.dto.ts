import { ApiProperty } from '@nestjs/swagger';

export class UpdateColumnDto {
  @ApiProperty({example: 'Column title', description: 'New title for column'})
  readonly title: string;
}