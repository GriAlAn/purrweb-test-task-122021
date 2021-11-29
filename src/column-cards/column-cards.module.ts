import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Column } from 'src/columns/column.model';
import { AuthModule } from '../auth/auth.module';
import { Card } from '../cards/card.model';
import { CardsModule } from '../cards/cards.module';
import { User } from '../users/user.model';
import { ColumnCardsController } from './column-cards.controller';
import { ColumnCardsService } from './column-cards.service';

@Module({
  controllers: [ColumnCardsController],
  providers: [ColumnCardsService],
  imports: [
    SequelizeModule.forFeature([User, Column, Card]),
    AuthModule,
    CardsModule,
  ],
})
export class ColumnCardsModule {
}
