import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/user.model';

interface ColumnCreationProps {
  title: string;
}

@Table({tableName: 'columns'})
class _Column extends Model<_Column, ColumnCreationProps> {
  @ApiProperty({example: '1', description: 'Unique key'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Title', description: 'Post title'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @ApiProperty({example: '1', description: 'Key to user'})
  @Column({type: DataType.INTEGER})
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

export { _Column as Column };
