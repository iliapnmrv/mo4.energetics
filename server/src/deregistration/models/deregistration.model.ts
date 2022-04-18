import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Item } from 'src/item/models/item.model';

interface DeregistrationCreationAttrs {
  inventorynumber: number;
  deregistrationdate: Date;
  reason: string;
  agreement: string;
  attachments: IFile[];
}

export type IFile = {
  name: string;
  path: string;
};

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
    type: DataType.DATE,
  })
  deregistrationdate: Date;

  @Column({
    type: DataType.STRING,
  })
  reason: string;

  @Column({
    type: DataType.STRING,
  })
  agreement: string;

  @Column({
    get() {
      return JSON.parse(this.getDataValue('attachments'));
    },
    set(val: Array<string>) {
      return this.setDataValue('attachments', JSON.stringify(val));
    },
    type: DataType.STRING,
  })
  attachments: IFile[];

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
