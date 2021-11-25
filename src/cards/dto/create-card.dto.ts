import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({example: 'Card title', description: 'Title for card'})
  readonly title: string;

  @ApiProperty({example: 'Card body', description: 'Body for card'})
  readonly body: string;
}