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
import { ColumnsService } from './columns.service';

@Injectable()
export class ColumnBelongsToUserGuard implements CanActivate {
  constructor(private jwtService: JwtService, private columnsService: ColumnsService) {
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
      const columnId = Number(request.params.id);
      return this.columnsService.isColumnBelongsToUser(columnId, user.id);
    } catch (e) {
      throw new UnauthorizedException('User not authorized');
    }
  }
}
