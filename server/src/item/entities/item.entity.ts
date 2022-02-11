import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column()
  name: string;

  @Column()
  inventorynumber: number;

  @Column()
  dateofdelivery: Date;

  @Column()
  person: number;

  @Column()
  guaranteeperiod: Date;

  @Column()
  status: number;

  @Column()
  supplier: string;
}
