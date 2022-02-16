import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ItemCreationAttrs {
  inventorynumber: number;
  requestnumber: number;
  type: number;
  startdate: Date;
}

@Table({
  tableName: 'deregistration',
})
export class Repair extends Model<Repair, ItemCreationAttrs> {
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
  inventorynumber: number;

  @Column({
    type: DataType.STRING,
  })
  reason: string;

  @Column({
    type: DataType.STRING,
  })
  attachment: string;

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
