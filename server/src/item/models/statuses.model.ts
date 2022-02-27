import {
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
  tableName: 'statuses',
  createdAt: false,
  updatedAt: false,
})
export class Status extends Model<Status> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @HasOne(() => Item, { foreignKey: 'status_id', as: 'Status' })
  @Column({
    type: DataType.INTEGER,
  })
  statusId: number;

  @Column({
    type: DataType.STRING,
  })
  statusName: string;
}
