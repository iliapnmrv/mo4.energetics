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
import { Deregistration } from 'src/deregistration/models/deregistration.model';
import { Log } from 'src/logs/models/logs.model';
import { Repair } from 'src/repairs/models/repairs.model';
import { Person } from './persons.model';
import { Place } from './places.model';
import { Status } from './statuses.model';
import { Type } from './types.model';

interface ItemCreationAttrs {
  name: string;
  inventorynumber: number;
  registrationdate: Date;
  commissioningdate: Date;
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
export class Item extends Model implements ItemCreationAttrs {
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

  @HasMany(() => Repair, {
    foreignKey: 'inventorynumber',
    as: 'Repairs',
    sourceKey: 'inventorynumber',
  })
  @HasMany(() => Log, {
    foreignKey: 'inventorynumber',
    as: 'Log',
    sourceKey: 'inventorynumber',
  })
  @HasMany(() => Deregistration, {
    foreignKey: 'inventorynumber',
    as: 'Deregistration',
    sourceKey: 'inventorynumber',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
  })
  inventorynumber: number;

  @Column({
    type: DataType.DATEONLY,
  })
  registrationdate: Date;

  @Column({
    type: DataType.DATEONLY,
  })
  commissioningdate: Date;

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
