import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/user.model';
import { Column } from './column.model';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(@InjectModel(Column) private columnRepository: typeof Column, @InjectModel(User) private userRepository: typeof User, private authService: AuthService) {
  }

  async createColumn(dto: CreateColumnDto, token: string) {
    const userId = Number(this.authService.getUserIdByToken(token));
    const column = await this.columnRepository.create(dto);
    const user = await this.userRepository.findByPk(userId);
    await column.$set('user', userId);
    column.user = user;
    return column;
  }

  async getOneColumn(id: number) {
    return await this.columnRepository.findByPk(id);
  }

  async getAllColumns() {
    return await this.columnRepository.findAll();
  }

  async updateColumn(id: number, dto: UpdateColumnDto) {
    const column = await this.columnRepository.findByPk(id);
    await column.update(dto)
    return column.save()

  }

  async deleteColumn(id: number) {
    const column = this.columnRepository.findByPk(id);
    return (await column).destroy();
  }
}
