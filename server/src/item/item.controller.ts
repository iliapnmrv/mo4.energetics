import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  updateItem(@Param('id') id: number, @Body() itemDto: UpdateItemDto) {
    return this.service.updateItem(id, itemDto);
  }

  @Post()
  createItem(@Body() itemDto: CreateItemDto) {
    return this.service.createItem(itemDto);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: number) {
    return this.service.deleteItem(id);
  }
}
