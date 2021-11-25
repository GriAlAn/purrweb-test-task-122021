import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { AuthModule } from '../auth/auth.module';
import { Column } from './column.model';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  imports: [
    SequelizeModule.forFeature([User, Column]),
    AuthModule,
  ],
})
export class ColumnsModule {
}
