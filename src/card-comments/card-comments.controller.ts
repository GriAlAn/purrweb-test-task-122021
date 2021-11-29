import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Comment } from 'sequelize-typescript';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { CardCommentsService } from './card-comments.service';

@ApiTags('Card\'s comments')
@Controller('cards')
export class CardCommentsController {
  constructor(private cardCommentsService: CardCommentsService) {
  }

  @ApiOperation({summary: 'Create comment for card'})
  @ApiResponse({status: 200, type: Comment})
  @ApiParam({name: 'columnId', type: 'number', description: 'Unique key for column'})
  @UseGuards(AuthGuard)
  @Post(':cardId/comments')
  async createCommentForCard(@Req() request: Request, @Param('cardId', ParseIntPipe) cardId: number, @Body() createCommentDto: CreateCommentDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.cardCommentsService.createCommentForCard(createCommentDto, cardId, token);
  }

  @ApiOperation({summary: 'Get all comments for card'})
  @ApiResponse({status: 200, type: [Comment]})
  @ApiParam({name: 'cardId', type: 'number', description: 'Unique key for column'})
  @Get(':cardId/comments')
  async getAllCommentsForCard(@Param('cardId', ParseIntPipe) columnId: number) {
    return this.cardCommentsService.getAllCommentsForCard(columnId);
  }
}
