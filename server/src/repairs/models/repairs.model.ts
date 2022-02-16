import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RepairCreationAttrs {
  inventorynumber: number;
  requestnumber: number;
  type: number;
  startdate: Date;
}

@Table({
  tableName: 'repairs',
})
export class Repair extends Model<Repair, RepairCreationAttrs> {
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
    type: DataType.INTEGER,
  })
  type: number;

  @Column({
    type: DataType.INTEGER,
  })
  decision: number;

  @Column({
    type: DataType.DATEONLY,
  })
  startdate: Date;

  @Column({
    type: DataType.DATEONLY,
  })
  enddate: Date;

  @Column({
    type: DataType.DATEONLY,
  })
  handoverdate: Date;

  @Column({
    type: DataType.STRING,
  })
  comments: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

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
