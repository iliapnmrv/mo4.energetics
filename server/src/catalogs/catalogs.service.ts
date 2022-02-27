import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from 'src/item/models/persons.model';
import { Place } from 'src/item/models/places.model';
import { Status } from 'src/item/models/statuses.model';
import { Type } from 'src/item/models/types.model';
import { RepairsType } from 'src/repairs/models/types.model';

@Injectable()
export class CatalogsService {
  constructor(
    @InjectModel(Status) private statusRepository: typeof Status,
    @InjectModel(Person) private personRepository: typeof Person,
    @InjectModel(Place) private placeRepository: typeof Place,
    @InjectModel(Type) private typeRepository: typeof Type,
    @InjectModel(RepairsType) private repairTypeRepository: typeof RepairsType,
  ) {}

  async getPersons(): Promise<any> {
    return await this.personRepository.findAll();
  }
  async getStatuses(): Promise<any> {
    return await this.statusRepository.findAll();
  }
  async getPlaces(): Promise<any> {
    return await this.placeRepository.findAll();
  }
  async getTypes(): Promise<any> {
    return await this.typeRepository.findAll();
  }
  async getRepairsTypes(): Promise<any> {
    return await this.repairTypeRepository.findAll();
  }
}
