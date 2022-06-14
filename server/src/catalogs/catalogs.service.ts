import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from 'src/item/models/persons.model';
import { Place } from 'src/item/models/places.model';
import { Status } from 'src/item/models/statuses.model';
import { Type } from 'src/item/models/types.model';
import { RepairsDecision } from 'src/repairs/models/decision.model';
import { RepairsType } from 'src/repairs/models/types.model';

@Injectable()
export class CatalogsService {
  constructor(
    @InjectModel(Status) private statusesRepository: typeof Status,
    @InjectModel(Person) private personsRepository: typeof Person,
    @InjectModel(Place) private placesRepository: typeof Place,
    @InjectModel(Type) private typesRepository: typeof Type,
    @InjectModel(RepairsType)
    private repairsTypesRepository: typeof RepairsType,
    @InjectModel(RepairsDecision)
    private repairsDecisionsRepository: typeof RepairsDecision,
  ) {}

  catalogNames = {
    persons: 'person',
    places: 'place',
    types: 'person',
    statuses: 'status',
    repairsTypes: 'type',
    repairsDecisions: 'decision',
  };

  async getCatalog(catalog: string): Promise<any> {
    return await this[`${catalog}Repository`].findAll();
  }
  async createCatalogItem(catalog: string, dto: any): Promise<any> {
    const item = await this[`${catalog}Repository`].create({ ...dto });
    return item;
  }
  async updateCatalogItem(catalog: string, id: string, dto: any): Promise<any> {
    return await this[`${catalog}Repository`].update(
      { ...dto },
      { where: { [`${this.catalogNames[catalog]}Id`]: id } },
    );
  }
  async deleteCatalogItem(catalog: string, id: string): Promise<any> {
    return await this[`${catalog}Repository`].destroy({
      where: { [`${this.catalogNames[catalog]}Id`]: id },
    });
  }
}
