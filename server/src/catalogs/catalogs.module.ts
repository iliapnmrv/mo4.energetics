import { Module } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { CatalogsController } from './catalogs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Type } from 'src/item/models/types.model';
import { Place } from 'src/item/models/places.model';
import { Status } from 'src/item/models/statuses.model';
import { Person } from 'src/item/models/persons.model';
import { RepairsType } from 'src/repairs/models/types.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Type, Place, Status, Person, RepairsType]),
  ],
  providers: [CatalogsService],
  controllers: [CatalogsController],
})
export class CatalogsModule {}
