import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Blog } from '../blog/blog.model';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @HasMany(() => Blog)
  blogs: Blog[];

  @Column
  role: string;
}
