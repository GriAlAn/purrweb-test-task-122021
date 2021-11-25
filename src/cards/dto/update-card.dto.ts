import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiProperty({example: 'Card title', description: 'New title for card'})
  readonly title: string;

  @ApiProperty({example: 'Card body', description: 'New body for card'})
  readonly body: string;
}