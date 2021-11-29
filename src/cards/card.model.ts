import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Column as _Column } from '../columns/column.model';

interface CardCreationProps {
  title: string;
}

@Table({tableName: 'cards'})
export class Card extends Model<Card, CardCreationProps> {
  @ApiProperty({example: '1', description: 'Unique key'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Title', description: 'Card title'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @ApiProperty({example: 'Body', description: 'Card body'})
  @Column({type: DataType.STRING, allowNull: true})
  body: string;

  @ApiProperty({example: '1', description: 'Key to user'})
  @Column({type: DataType.INTEGER})
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({example: '1', description: 'Key to column'})
  @Column({type: DataType.INTEGER})
  @ForeignKey(() => _Column)
  columnId: number;

  @BelongsTo(() => _Column)
  column: _Column
}
