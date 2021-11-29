import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Comment } from './comment.model';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentsRepository: typeof Comment) {
  }

  async getOneComment(id: number) {
    return await this.commentsRepository.findByPk(id);
  }

  async getAllComments() {
    return await this.commentsRepository.findAll();
  }

  async updateComment(id: number, dto: UpdateCommentDto) {
    const comment = await this.commentsRepository.findByPk(id);
    await comment.update(dto);
    return comment.save();

  }

  async deleteComment(id: number) {
    const comment = await this.commentsRepository.findByPk(id);
    return comment.destroy();
  }

  async getCommentsByUser(user: User) {
    return this.commentsRepository.findAll({where: {userId: user.id}});
  }

  async isCommentBelongsToUser(commentId: number, userId: number) {
    const comment = await this.commentsRepository.findOne({where: {id: commentId}, include: {all: true}})
    return comment.user.id === userId;
  }
}
