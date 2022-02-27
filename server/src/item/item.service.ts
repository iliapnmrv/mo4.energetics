import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Item } from 'src/item/models/item.model';
import { Repair } from 'src/repairs/models/repairs.model';
import { RepairsType } from 'src/repairs/models/types.model';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Person } from './models/persons.model';
import { Place } from './models/places.model';
import { Status } from './models/statuses.model';
import { Type } from './models/types.model';

// https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md
// https://stackoverflow.com/questions/20156045/get-values-from-associated-table-with-sequelize-js
// https://stackoverflow.com/questions/53117988/sequelize-select-and-include-another-table-alias
@Injectable()
export class ItemService {
  constructor(@InjectModel(Item) private itemsRepository: typeof Item) {}

  async getAll(): Promise<any> {
    return await this.itemsRepository.findAll({
      // raw: true,
      // nest: true,
      include: [
        { model: Person, as: 'Person' },
        { model: Status, as: 'Status' },
        { model: Type, as: 'Type' },
        { model: Place, as: 'Place' },
      ],
    });
  }

  async getOne(id: number): Promise<Item> {
    console.log(id);

    return await this.itemsRepository.findOne({
      where: { inventorynumber: id },
      include: [
        { model: Person, as: 'Person' },
        { model: Status, as: 'Status' },
        { model: Type, as: 'Type' },
        { model: Place, as: 'Place' },
        { model: Repair },
      ],
    });
  }

  async createItem(dto: CreateItemDto): Promise<Item> {
    const item = await this.itemsRepository.create(dto);
    return item;
  }

  async updateItem(id: number, dto: UpdateItemDto): Promise<Item> {
    console.log(id, dto);

    for (const key in dto) {
      console.log({ [key]: dto[key] });

      await this.itemsRepository.update(
        { [key]: dto[key] },
        { where: { inventorynumber: id } },
      );
    }
    const updatedItem = await this.itemsRepository.findOne({
      where: { inventorynumber: id },
    });
    console.log(updatedItem);

    return updatedItem;
  }

  async deleteItem(id: number) {
    return await this.itemsRepository.destroy({
      where: { inventorynumber: id },
    });
  }
}
