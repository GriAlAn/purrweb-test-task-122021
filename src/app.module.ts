import { Module } from '@nestjs/common';
import { Column } from './columns/column.model';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { ColumnsModule } from './columns/columns.module';
import { User } from './users/user.model';
import { UserColumnsModule } from './user-columns/user-columns.module';
import { CardsModule } from './cards/cards.module';
import { Card } from './cards/card.model';
import { ColumnCardsModule } from './column-cards/column-cards.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Column, Card],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    ColumnsModule,
    UserColumnsModule,
    CardsModule,
    ColumnCardsModule,
    CommentsModule,
  ],
})
export class AppModule {
}