import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './card.model';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card) private cardRepository: typeof Card) {
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

  async isCardBelongsToUser(cardId: number, userId: number) {
    const card = await this.cardRepository.findOne({where: {id: cardId}, include: {all: true}})
    return card.user.id === userId;
  }
}
