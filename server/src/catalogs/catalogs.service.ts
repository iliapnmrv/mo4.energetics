import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from 'src/item/models/statuses.model';
import { Person } from 'src/item/models/persons.model';
import { Place } from 'src/item/models/places.model';
import { RepairsType } from 'src/repairs/models/types.model';
import { Type } from 'src/item/models/types.model';
import { RepairsDecision } from 'src/repairs/models/decision.model';
import { ICatalogs } from './catalogs.controller';

@Injectable()
export class CatalogService {
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

  async create(catalog: ICatalogs, createCatalogDto: CreateCatalogDto) {
    console.log(catalog, createCatalogDto);

    return await this[`${catalog}Repository`].create({
      ...createCatalogDto,
    });
  }

  async findAll() {
    const select = {
      attributes: ['id', 'name'],
      order: ['name'],
    };
    return {
      persons: await this.personsRepository.findAll(select),
      statuses: await this.statusesRepository.findAll(select),
      places: await this.placesRepository.findAll(select),
      types: await this.typesRepository.findAll(select),
      repairsTypes: await this.repairsTypesRepository.findAll(select),
      repairsDecisions: await this.repairsDecisionsRepository.findAll(select),
    };
  }

  async findOne(catalog: ICatalogs) {
    return await this[`${catalog}Repository`].findOne();
  }

  async update(
    catalog: ICatalogs,
    id: number,
    updateCatalogDto: UpdateCatalogDto,
  ) {
    return await this[`${catalog}Repository`].update(
      {
        ...updateCatalogDto,
      },
      { where: { id } },
    );
  }

  async remove(catalog: ICatalogs, id: number) {
    return await this[`${catalog}Repository`].destroy({ where: { id } });
  }
}
