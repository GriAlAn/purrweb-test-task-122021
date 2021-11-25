import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/user.model';
import { Column } from './column.model';
import { CreateColumnDto } from './dto/create-column.dto';

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

  getOneColumn(id: number) {
    return this.columnRepository.findByPk(id);
  }

  getAllColumns() {
    return this.columnRepository.findAll();
  }

  updateColumn(id: number) {
    const column = this.columnRepository.findByPk(id);


  }

  async deleteColumn(id: number) {
    const column = this.columnRepository.findByPk(id);
    return (await column).destroy();
  }
}
