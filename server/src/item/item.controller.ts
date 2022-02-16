import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private service: ItemService) {}

  @Get(':id')
  getOne(@Param() params) {
    return this.service.getOne(params.id);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post(':id')
  updateItem(@Param('id') id, @Body() itemDto: UpdateItemDto) {
    return this.service.updateItem(id, itemDto);
  }

  @Post()
  createItem(@Body() itemDto: CreateItemDto) {
    return this.service.createItem(itemDto);
  }

  //   @Post()
  //   create(@Body() user: Item) {
  //     return this.service.createUser(user);
  //   }
}
