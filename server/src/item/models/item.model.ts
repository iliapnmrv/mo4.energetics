import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Repair } from 'src/repairs/models/repairs.model';
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
  type_id: number;
  place_id: number;
  person_id: number;
  status_id: number;
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

  @BelongsTo(() => Type, { foreignKey: 'type_id', as: 'Type' })
  @Column({
    type: DataType.INTEGER,
  })
  type_id: number;

  @BelongsTo(() => Person, { foreignKey: 'person_id', as: 'Person' })
  @Column({
    type: DataType.INTEGER,
  })
  person_id: number;

  @BelongsTo(() => Status, { foreignKey: 'status_id', as: 'Status' })
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @BelongsTo(() => Place, { foreignKey: 'place_id', as: 'Place' })
  @Column({
    type: DataType.INTEGER,
  })
  place_id: number;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @HasMany(() => Repair)
  repairs: Repair[];

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
