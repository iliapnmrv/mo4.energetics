import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
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

  @HasOne(() => Repair, { foreignKey: 'type_id', as: 'RepairsType' })
  @Column({
    type: DataType.INTEGER,
  })
  typeId: number;

  @Column({
    type: DataType.STRING,
  })
  typeName: string;
}
