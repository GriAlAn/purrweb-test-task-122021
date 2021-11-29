import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.model';
import { CommentsService } from './comments.service';

@Injectable()
export class CommentBelongsToUserGuard implements CanActivate {
  constructor(private jwtService: JwtService, private commentsService: CommentsService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('User not authorized');
      }

      const user = this.jwtService.verify<User>(token);
      const commentId = Number(request.params.id);
      return this.commentsService.isCommentBelongsToUser(commentId, user.id);
    } catch (e) {
      throw new UnauthorizedException('User not authorized');
    }
  }
}
