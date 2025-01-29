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

  @Column
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
