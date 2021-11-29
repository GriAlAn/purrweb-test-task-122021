import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Column } from 'src/columns/column.model';
import { AuthService } from '../auth/auth.service';
import { Card } from '../cards/card.model';
import { CreateCardDto } from '../cards/dto/create-card.dto';
import { User } from '../users/user.model';

@Injectable()
export class ColumnCardsService {
  constructor(@InjectModel(Card) private cardRepository: typeof Card, @InjectModel(User) private userRepository: typeof User, @InjectModel(Column) private columnRepository: typeof Column, private authService: AuthService) {
  }

  async createCardForColumn(dto: CreateCardDto, columnId: number, token: string) {
    const userId = Number(this.authService.getUserIdByToken(token));
    const user = await this.userRepository.findByPk(userId);
    const column = await this.columnRepository.findByPk(columnId);
    const card = await this.cardRepository.create(dto);
    await card.$set('user', userId);
    await card.$set('column', columnId);
    card.user = user;
    card.column = column;
    return card;
  }

  async getAllCardsForColumn(columnId: number) {
    const cards = await this.cardRepository.findAll({where: {columnId}})
    return cards;
  }
}
