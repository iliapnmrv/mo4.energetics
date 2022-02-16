import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Person } from './persons.model';
import { Place } from './places.model';
import { Status } from './statuses.model';
import { Type } from './types.model';

interface ItemCreationAttrs {
  name: string;
  inventorynumber: number;
  dateofdelivery: Date;
  guaranteeperiod: Date;
  supplier: string;
  type: number;
  placeId: number;
  person: number;
  statusId: number;
  description?: string;
}

@Table({
  tableName: 'items',
})
export class Item extends Model<Item, ItemCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
  })
  inventorynumber: number;

  @Column({
    type: DataType.DATEONLY,
  })
  dateofdelivery: Date;

  @Column({
    type: DataType.DATEONLY,
  })
  guaranteeperiod: Date;

  @Column({
    type: DataType.STRING,
  })
  supplier: string;

  @HasMany(() => Type, { foreignKey: 'typeId', as: 'typeId' })
  @Column({
    type: DataType.INTEGER,
  })
  type: number;

  @HasMany(() => Person, { foreignKey: 'personId', as: 'personId' })
  @Column({
    type: DataType.INTEGER,
  })
  person: number;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  statusId: number;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.INTEGER,
  })
  placeId: number;

  @Column({
    type: DataType.STRING,
  })
  description: string;

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
