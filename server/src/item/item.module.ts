import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from 'src/item/models/item.model';
import { Log } from 'src/logs/models/logs.model';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Person } from './models/persons.model';
import { Place } from './models/places.model';
import { Status } from './models/statuses.model';
import { Type } from './models/types.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Item, Type, Place, Status, Person, Log]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
