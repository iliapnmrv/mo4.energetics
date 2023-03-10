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
  tableName: 'repairs_decisions',
  createdAt: false,
  updatedAt: false,
})
export class RepairsDecision extends Model<RepairsDecision> {
  @HasOne(() => Repair, { foreignKey: 'decision_id', as: 'RepairsDecision' })
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
}
