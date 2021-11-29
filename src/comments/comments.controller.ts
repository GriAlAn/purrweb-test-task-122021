import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommentBelongsToUserGuard } from './comment-belongs-to-user.guard';
import { Comment } from './comment.model';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {
  }

  @ApiOperation({summary: 'Get one comment'})
  @ApiResponse({status: 200, type: Comment})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for comment'})
  @Get(':id')
  async getOneCommentById(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.getOneComment(id);
  }

  @ApiOperation({summary: 'Get all comments'})
  @ApiResponse({status: 200, type: [Comment]})
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({summary: 'Update comments'})
  @ApiResponse({status: 200, type: Comment})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for comment'})
  @UseGuards(AuthGuard, CommentBelongsToUserGuard)
  @Put(':id')
  updateCommentById(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @ApiOperation({summary: 'Delete comment'})
  @ApiResponse({status: 200})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for comment'})
  @UseGuards(AuthGuard, CommentBelongsToUserGuard)
  @Delete(':id')
  async deleteCommentById(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.deleteComment(id);
  }
}

