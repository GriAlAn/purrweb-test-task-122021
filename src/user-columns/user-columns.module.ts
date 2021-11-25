import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Column } from '../columns/column.model';
import { ColumnsModule } from '../columns/columns.module';
import { User } from '../users/user.model';
import { UsersModule } from '../users/users.module';
import { UserColumnsController } from './user-columns.controller';

@Module({
  controllers: [UserColumnsController],
  imports: [
    SequelizeModule.forFeature([User, Column]),
    UsersModule,
    ColumnsModule,
  ],
})
export class UserColumnsModule {
}
