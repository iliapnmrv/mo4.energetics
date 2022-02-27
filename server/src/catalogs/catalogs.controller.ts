import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';

@Controller('catalogs')
export class CatalogsController {
  constructor(private service: CatalogsService) {}

  @Get('/persons')
  getPersons() {
    return this.service.getPersons();
  }
  @Get('/places')
  getPlaces() {
    return this.service.getPlaces();
  }
  @Get('/statuses')
  getStatuses() {
    return this.service.getStatuses();
  }
  @Get('/types')
  getTypes() {
    return this.service.getTypes();
  }
  @Get('/repairsTypes')
  getRepairsTypes() {
    return this.service.getRepairsTypes();
  }
}
