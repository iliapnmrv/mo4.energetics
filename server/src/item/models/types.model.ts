import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Item } from 'src/item/models/item.model';

@Table({
  tableName: 'items_types',
  createdAt: false,
  updatedAt: false,
})
export class Type extends Model<Type> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  typeId: number;

  @Column({
    type: DataType.STRING,
  })
  typeName: string;

  @BelongsTo(() => Item, { foreignKey: 'type' })
  items: Item[];
}
