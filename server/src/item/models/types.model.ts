import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  HasOne,
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

  @HasOne(() => Item, { foreignKey: 'type_id', as: 'Type' })
  @Column({
    type: DataType.INTEGER,
  })
  typeId: number;

  @Column({
    type: DataType.STRING,
  })
  typeName: string;
}
