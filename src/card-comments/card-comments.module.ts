import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from 'src/cards/card.model';
import { User } from 'src/users/user.model';
import { AuthModule } from '../auth/auth.module';
import { Comment } from '../comments/comment.model';
import { CardCommentsController } from './card-comments.controller';
import { CardCommentsService } from './card-comments.service';

@Module({
  controllers: [CardCommentsController],
  providers: [CardCommentsService],
  imports: [
    SequelizeModule.forFeature([User, Card, Comment]),
    AuthModule,
  ],
})
export class CardCommentsModule {
}
