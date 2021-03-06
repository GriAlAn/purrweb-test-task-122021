import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const salt = 5;
    const hashPassword = await bcrypt.hash(userDto.password, salt);
    const user = await this.userService.createUser({...userDto, password: hashPassword});
    return this.generateToken(user);
  }

  getUserIdByToken(_token: string): number {
    const token = this.jwtService.decode(_token, {json: true}) as {id: number};
    return token.id;
  }

  async getUserByRequest(request: Request): Promise<User> {
    const token = request.headers.authorization.split(' ')[1]
    const userId = Number(this.getUserIdByToken(token));
    const user = this.userService.getUserById(userId);
    return user;
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id};
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({message: 'Incorrect email or password'});
  }
}
