import { Module } from '@nestjs/common';
import { ColumnsModule } from '../columns/columns.module';
import { UsersModule } from '../users/users.module';
import { UserColumnsController } from './user-columns.controller';

@Module({
  controllers: [UserColumnsController],
  imports: [
    UsersModule,
    ColumnsModule,
  ],
})
export class UserColumnsModule {
}
