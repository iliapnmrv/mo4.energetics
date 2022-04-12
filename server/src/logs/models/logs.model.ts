import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Item } from 'src/item/models/item.model';

interface LogCreationAttrs {
  action: string;
  inventorynumber: number;
}

@Table({
  tableName: 'logs',
})
export class Log extends Model implements LogCreationAttrs {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Item)
  @BelongsTo(() => Item, {
    foreignKey: 'inventorynumber',
    as: 'Item',
    targetKey: 'inventorynumber',
  })
  @Column({
    type: DataType.INTEGER,
  })
  inventorynumber: number;

  @Column({
    type: DataType.TEXT,
  })
  action: string;

  @Column({
    type: DataType.TEXT,
  })
  user: string;

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
