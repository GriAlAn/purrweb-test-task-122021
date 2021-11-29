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
import { CardsService } from './cards.service';

@Injectable()
export class CardBelongsToUserGuard implements CanActivate {
  constructor(private jwtService: JwtService, private cardsService: CardsService) {
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
      const cardId = Number(request.params.id);
      return this.cardsService.isCardBelongsToUser(cardId, user.id);
    } catch (e) {
      throw new UnauthorizedException('User not authorized');
    }
  }
}
