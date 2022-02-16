import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Item } from 'src/item/models/item.model';
import { Repair } from './repairs.model';

@Table({
  tableName: 'repairs_types',
  createdAt: false,
  updatedAt: false,
})
export class RepairsType extends Model<RepairsType> {
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
  typeId: number;

  @Column({
    type: DataType.STRING,
  })
  typeName: string;

  @HasMany(() => Repair)
  item: Repair[];
}
