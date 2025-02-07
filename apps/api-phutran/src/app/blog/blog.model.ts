import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from '../auth/user.model';

@Table
export class Blog extends Model {
  @Column
  title: string;

  @Column({
    type: DataType.TEXT('medium'),
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  tag: string[];

  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsTo(() => User)
  author: User;
}
