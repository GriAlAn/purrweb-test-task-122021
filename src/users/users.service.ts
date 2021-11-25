import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async isColumnBelongsToUser(userId: number, columnId: number) {
    const user = await this.userRepository.findOne({where: {id: userId}, include: {all: true}})
    return user.columns.some(column => column.id === columnId);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}});
    return user;
  }
}
