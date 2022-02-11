import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
import { Repository } from 'typeorm';

// https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
  ) {}

  async getItems(user: Item): Promise<Item[]> {
    console.log('getting');

    return await this.itemsRepository.find();
  }

  async getItem(id: number): Promise<Item> {
    console.log(id);

    return await this.itemsRepository.findOne({
      where: [{ id }],
    });
  }
}
