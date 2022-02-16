import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  @Column({
    type: DataType.INTEGER,
  })
  type_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  person_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  place_id: number;

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
