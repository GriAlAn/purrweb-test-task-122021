import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Card } from '../cards/card.model';
import { User } from '../users/user.model';

interface CommentCreationProps {
  body: string;
}

@Table({tableName: 'comments'})
export class Comment extends Model<Comment, CommentCreationProps> {
  @ApiProperty({example: '1', description: 'Unique key'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Body', description: 'Comment body'})
  @Column({type: DataType.STRING, allowNull: false})
  body: string;

  @ApiProperty({example: '1', description: 'Key to user'})
  @Column({type: DataType.INTEGER})
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({example: '2', description: 'Key to card'})
  @Column({type: DataType.INTEGER})
  @ForeignKey(() => Card)
  cardId: number;

  @BelongsTo(() => Card)
  card: Card;
}

