import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Item } from 'src/item/models/item.model';

@Table({
  tableName: 'persons',
  createdAt: false,
  updatedAt: false,
})
export class Person extends Model<Person> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  personId: number;

  @Column({
    type: DataType.STRING,
  })
  personName: string;
}
