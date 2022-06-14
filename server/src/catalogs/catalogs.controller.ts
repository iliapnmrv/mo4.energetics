import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CatalogsService } from './catalogs.service';

@Controller('catalogs')
export class CatalogsController {
  constructor(private service: CatalogsService) {}

  @Get('/:catalog')
  getCatalogs(@Param('catalog') catalog: string) {
    return this.service.getCatalog(catalog);
  }
  @Post('/:catalog')
  createCatalog(@Param('catalog') catalog: string, @Body() catalogDto: any) {
    return this.service.createCatalogItem(catalog, catalogDto);
  }
  @Put('/:catalog/:id')
  updateCatalog(
    @Param('catalog') catalog: string,
    @Param('id') id: string,
    @Body() catalogDto: any,
  ) {
    return this.service.updateCatalogItem(catalog, id, catalogDto);
  }
  @Delete('/:catalog/:id')
  deleteCatalog(@Param('catalog') catalog: string, @Param('id') id: string) {
    return this.service.deleteCatalogItem(catalog, id);
  }
}
