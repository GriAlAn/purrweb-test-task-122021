import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { Card } from './card.model';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {
  }

  @ApiOperation({summary: 'Create card'})
  @ApiResponse({status: 200, type: Card})
  @Post()
  async createCard(@Req() request: Request, @Body() createCardDto: CreateCardDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.cardsService.createCard(createCardDto, token);
  }

  @ApiOperation({summary: 'Get one card'})
  @ApiResponse({status: 200, type: Card})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for card'})
  @Get(':id')
  async getOneCardById(@Param('id') id: number) {
    return this.cardsService.getOneCard(id);
  }

  @ApiOperation({summary: 'Get all cards'})
  @ApiResponse({status: 200, type: [Card]})
  @Get()
  async getAllCards() {
    return this.cardsService.getAllCards();
  }

  @ApiOperation({summary: 'Update card'})
  @ApiResponse({status: 200, type: Card})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for card'})
  @Put(':id')
  updateCardById(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.updateCard(id, updateCardDto);
  }

  @ApiOperation({summary: 'Delete card'})
  @ApiResponse({status: 200})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for card'})
  @Delete(':id')
  async deleteCardById(@Param('id') id: number) {
    return this.cardsService.deleteCard(id);
  }
}
