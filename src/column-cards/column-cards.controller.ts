import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Card } from '../cards/card.model';
import { CreateCardDto } from '../cards/dto/create-card.dto';
import { ColumnCardsService } from './column-cards.service';

@ApiTags('Column cards')
@Controller('columns')
export class ColumnCardsController {
  constructor(private columnCardsService: ColumnCardsService) {
  }

  @ApiOperation({summary: 'Create card for column'})
  @ApiResponse({status: 200, type: Card})
  @ApiParam({name: 'columnId', type: 'number', description: 'Unique key for column'})
  @UseGuards(AuthGuard)
  @Post(':columnId/cards')
  async createCardForColumn(@Req() request: Request, @Param('columnId', ParseIntPipe) columnId: number, @Body() createCardDto: CreateCardDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.columnCardsService.createCardForColumn(createCardDto, columnId, token);
  }

  @ApiOperation({summary: 'Get all cards for column'})
  @ApiResponse({status: 200, type: [Card]})
  @ApiParam({name: 'columnId', type: 'number', description: 'Unique key for column'})
  @Get(':columnId/cards')
  async getAllCardsForColumn(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.columnCardsService.getAllCardsForColumn(columnId);
  }
}
