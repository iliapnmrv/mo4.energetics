import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DeregistrationCreationAttrs {
  inventorynumber: number;
  reason: string;
  agreement: string;
}

@Table({
  tableName: 'deregistration',
})
export class Deregistration extends Model<
  Deregistration,
  DeregistrationCreationAttrs
> {
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
  agreement: string;

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
