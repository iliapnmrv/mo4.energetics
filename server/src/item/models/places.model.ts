import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Item } from 'src/item/models/item.model';

@Table({
  tableName: 'places',
  createdAt: false,
  updatedAt: false,
})
export class Place extends Model<Place> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @HasOne(() => Item, { foreignKey: 'place_id', as: 'Place' })
  @Column({
    type: DataType.INTEGER,
  })
  placeId: number;

  @Column({
    type: DataType.STRING,
  })
  placeName: string;

  @HasMany(() => Item, 'placeId')
  item: Item[];
}
