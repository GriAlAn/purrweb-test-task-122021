import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/user.model';
import { Card } from './card.model';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card) private cardRepository: typeof Card, @InjectModel(User) private userRepository: typeof User) {
  }

  async getOneCard(id: number) {
    return await this.cardRepository.findByPk(id);
  }

  async getAllCards() {
    return await this.cardRepository.findAll();
  }

  async updateCard(id: number, dto: UpdateCardDto) {
    const card = await this.cardRepository.findByPk(id);
    await card.update(dto);
    return card.save();
  }

  async deleteCard(id: number) {
    const card = await this.cardRepository.findByPk(id);
    return card.destroy();
  }
}
