import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Item } from 'src/item/models/item.model';

@Table({
  tableName: 'statuses',
})
export class Status extends Model<Status> {
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
  statusId: number;

  @Column({
    type: DataType.STRING,
  })
  statusName: string;

  @Column({
    defaultValue: DataType.NOW,
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    defaultValue: DataType.NOW,
    type: DataType.DATE,
  })
  updatedAt: Date;
}
