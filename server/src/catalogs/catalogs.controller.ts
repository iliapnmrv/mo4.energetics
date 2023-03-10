import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { CatalogService } from './catalogs.service';

export type ICatalogs =
  | 'persons'
  | 'statuses'
  | 'places'
  | 'types'
  | 'repairsTypes'
  | 'repairsDecisions';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post(':catalog')
  create(
    @Body() createCatalogDto: CreateCatalogDto,
    @Param('catalog') catalog: ICatalogs,
  ) {
    return this.catalogService.create(catalog, createCatalogDto);
  }

  @Get()
  findAll() {
    return this.catalogService.findAll();
  }

  @Get(':catalog')
  findByName(@Param('catalog') catalog: ICatalogs) {
    return this.catalogService.findOne(catalog);
  }

  @Patch(':catalog/:id')
  update(
    @Param('id') id: string,
    @Param('catalog') catalog: ICatalogs,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ) {
    return this.catalogService.update(catalog, +id, updateCatalogDto);
  }

  @Delete(':catalog/:id')
  remove(@Param('id') id: string, @Param('catalog') catalog: ICatalogs) {
    return this.catalogService.remove(catalog, +id);
  }
}
