import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({example: 'New comment body', description: 'Body for comment'})
  readonly body: string;
}