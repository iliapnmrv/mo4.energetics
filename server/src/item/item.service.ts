import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectRepository } from '@nestjs/typeorm';
import { where } from 'sequelize/types';
import { Item } from 'src/item/models/item.model';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Person } from './models/persons.model';
import { Type } from './models/types.model';

// https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item) private itemsRepository: typeof Item) {}

  async getAll(): Promise<any> {
    console.log('getting');

    return await this.itemsRepository.findAll({
      subQuery: false,
      include: [
        {
          model: Person,
          required: true,
        },
        {
          model: Type,
          required: true,
        },
      ],
    });

    // return await this.itemsRepository.sequelize.query('select * from items');
  }

  async getOne(id: number): Promise<Item> {
    console.log(id);

    return await this.itemsRepository.findOne({
      where: { inventorynumber: id },
    });
  }

  async createItem(dto: CreateItemDto): Promise<Item> {
    const item = await this.itemsRepository.create(dto);
    return item;
  }

  async updateItem(id: number, dto: UpdateItemDto): Promise<Item> {
    for (const key in dto) {
      await this.itemsRepository.update(
        { [key]: dto[key] },
        { where: { inventorynumber: id } },
      );
    }
    return await this.itemsRepository.findOne({
      where: { inventorynumber: id },
    });
  }
}
