import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/user.model';
import { Card } from '../cards/card.model';
import { Comment } from '../comments/comment.model';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

@Injectable()
export class CardCommentsService {
  constructor(@InjectModel(Comment) private commentsRepository: typeof Comment, @InjectModel(User) private userRepository: typeof User, @InjectModel(Card) private cardsRepository: typeof Card, private authService: AuthService) {
  }

  async createCommentForCard(createCommentDto: CreateCommentDto, cardId: number, token: string) {
    const userId = Number(this.authService.getUserIdByToken(token));
    const user = await this.userRepository.findByPk(userId);
    const card = await this.cardsRepository.findByPk(cardId);
    const comment = await this.commentsRepository.create(createCommentDto);
    await comment.$set('user', userId);
    await comment.$set('card', cardId);
    comment.user = user;
    comment.card = card;
    return comment;
  }

  async getAllCommentsForCard(cardId: number) {
    const comments = await this.commentsRepository.findAll({where: {cardId}});
    return comments;
  }
}
