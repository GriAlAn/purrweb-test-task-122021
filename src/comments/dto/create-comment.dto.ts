import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({example: 'Comment body', description: 'Body for comment'})
  readonly body: string;
}