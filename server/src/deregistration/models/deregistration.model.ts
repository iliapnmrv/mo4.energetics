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
  attachments: string[];
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
      return this.getDataValue('attachments').split(';');
    },
    set(val: Array<string>) {
      this.setDataValue('attachments', val.join(';'));
    },
    type: DataType.STRING,
  })
  attachments: string[];

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
