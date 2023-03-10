import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Type } from 'src/item/models/types.model';
import { Place } from 'src/item/models/places.model';
import { Status } from 'src/item/models/statuses.model';
import { Person } from 'src/item/models/persons.model';
import { RepairsType } from 'src/repairs/models/types.model';
import { RepairsDecision } from 'src/repairs/models/decision.model';
import { CatalogController } from './catalogs.controller';
import { CatalogService } from './catalogs.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Type,
      Place,
      Status,
      Person,
      RepairsType,
      RepairsDecision,
    ]),
  ],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogsModule {}
