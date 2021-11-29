import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { AuthModule } from '../auth/auth.module';
import { Comment } from './comment.model';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([User, Comment]),
    AuthModule,
  ]
})
export class CommentsModule {}
