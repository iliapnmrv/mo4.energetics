import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Item } from 'src/item/entities/item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private service: ItemService) {}

  @Get(':id')
  getOne(@Param() params) {
    return this.service.getItem(params.id);
  }

  @Get('')
  getAll(@Param() params) {
    return this.service.getItems(params.id);
  }

  //   @Post()
  //   create(@Body() user: Item) {
  //     return this.service.createUser(user);
  //   }
}
