import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Column as _Column } from '../columns/column.model';

interface UserCreationProps {
  email: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationProps> {
  @ApiProperty({example: '1', description: 'Unique key'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'use@gmail.com', description: 'E-mail'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: 'password', description: 'Password'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @HasMany(() => _Column)
  columns: _Column[]
}
