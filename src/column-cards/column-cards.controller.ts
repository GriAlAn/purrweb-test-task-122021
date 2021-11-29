import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Card } from '../cards/card.model';
import { CardsService } from '../cards/cards.service';
import { CreateCardDto } from '../cards/dto/create-card.dto';
import { ColumnCardsService } from './column-cards.service';

@ApiTags('Column Cards')
@Controller('columns')
export class ColumnCardsController {
  constructor(private columnCardsService: ColumnCardsService) {
  }

  @ApiOperation({summary: 'Create card for column'})
  @ApiResponse({status: 200, type: Card})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for column'})
  @Post(':id')
  async createCardForColumn(@Req() request: Request, @Param('id') columnId: number, @Body() createCardDto: CreateCardDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.columnCardsService.createCardForColumn(createCardDto, columnId, token);
  }
}
