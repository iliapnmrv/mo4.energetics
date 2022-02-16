import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from 'src/item/models/item.model';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
