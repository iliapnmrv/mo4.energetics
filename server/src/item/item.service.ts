import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment';

import { Op } from 'sequelize';
import { Deregistration } from 'src/deregistration/models/deregistration.model';
import { Item } from 'src/item/models/item.model';
import { Log } from 'src/logs/models/logs.model';
import { Repair } from 'src/repairs/models/repairs.model';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Person } from './models/persons.model';
import { Place } from './models/places.model';
import { Status } from './models/statuses.model';
import { Type } from './models/types.model';
import { CatalogService } from 'src/catalogs/catalogs.service';
import { Catalogs, itemNames } from 'src/utils/itemNames';

// https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md
// https://stackoverflow.com/questions/20156045/get-values-from-associated-table-with-sequelize-js
// https://stackoverflow.com/questions/53117988/sequelize-select-and-include-another-table-alias
@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item) private itemsRepository: typeof Item,
    @InjectModel(Log) private logsRepository: typeof Log,
    private catalogService: CatalogService,
  ) {}

  async getAll(keys: { [key: string]: any }, search = '') {
    console.log(keys);

    for (const key in keys) {
      if (!keys[key] || keys[key] === 'null') {
        delete keys[key];
      } else {
        if (
          key === 'registrationdateFrom' ||
          key === 'registrationdateTo' ||
          key === 'guaranteeperiodFrom' ||
          key === 'guaranteeperiodTo'
        ) {
          if (key.includes('To')) {
            keys[key.split('To')[0]] = {
              [Op.and]: {
                ...keys[key.split('To')[0]]?.[Op.and],
                [Op.lte]: moment(keys[key]).format(),
              },
            };
            delete keys[key];
          }
          if (key.includes('From')) {
            keys[key.split('From')[0]] = {
              [Op.and]: {
                ...keys[key.split('From')[0]]?.[Op.and],
                [Op.gte]: moment(keys[key]).format(),
              },
            };
            delete keys[key];
          }
        } else {
          keys[key] = keys[key].split(',');
        }
      }
    }
    console.log(keys);

    return await this.itemsRepository.findAll({
      include: [
        { model: Person, as: 'Person' },
        { model: Status, as: 'Status' },
        { model: Type, as: 'Type' },
        { model: Place, as: 'Place' },
        { model: Log, as: 'Log' },
        { model: Repair, as: 'Repairs' },
      ],
      where: {
        [Op.and]: [
          {
            ...keys,
            [Op.or]: [
              {
                name: search ? { [Op.like]: `%${search}%` } : { [Op.ne]: null },
              },
              {
                inventorynumber: search
                  ? { [Op.like]: `%${search}%` }
                  : { [Op.ne]: null },
              },
              {
                supplier: search
                  ? { [Op.like]: `%${search}%` }
                  : { [Op.ne]: null },
              },
              {
                description: search
                  ? { [Op.like]: `%${search}%` }
                  : { [Op.ne]: null },
              },
            ],
          },
        ],
      },

      order: [
        ['inventorynumber', 'ASC'],
        [{ model: Log, as: 'Log' }, 'createdAt', 'ASC'],
      ],
    });
  }

  async getOne(id: number): Promise<Item> {
    return await this.itemsRepository.findOne({
      where: { inventorynumber: id },
      include: [
        { model: Person, as: 'Person' },
        { model: Status, as: 'Status' },
        { model: Type, as: 'Type' },
        { model: Place, as: 'Place' },
        { model: Repair, as: 'Repairs' },
        { model: Log, as: 'Log' },
        { model: Deregistration, as: 'Deregistration' },
      ],
      order: [[{ model: Log, as: 'Log' }, 'createdAt', 'ASC']],
    });
  }

  async createItem(dto: CreateItemDto): Promise<Item> {
    const item = await this.itemsRepository.create(dto);
    await this.logsRepository.create({
      inventorynumber: dto.inventorynumber,
      action: 'Позиция создана',
    });
    return item;
  }

  async updateItem(id: number, dto: UpdateItemDto): Promise<Item> {
    const prev = await this.itemsRepository.findOne({
      where: { inventorynumber: id },
      raw: true,
    });

    await this.itemsRepository.update(
      {
        ...dto,
        updatedAt: new Date(),
      },
      { where: { inventorynumber: id } },
    );

    const updated = await this.itemsRepository.findOne({
      where: { inventorynumber: id },
      raw: true,
    });

    console.log(updated);

    //@ts-ignore
    delete updated.updatedAt;
    //@ts-ignore
    delete updated.createdAt;

    const differencesKeys = Object.keys(updated).filter(
      (key) => updated[key] !== prev[key],
    );

    console.log(differencesKeys);

    const catalogs = await this.catalogService.findAll();

    await this.logsRepository.create({
      action: differencesKeys
        .map((key) => {
          if (key in Catalogs) {
            return `${itemNames[key]}: ${
              catalogs[Catalogs[key]].find((item) => item.id === prev[key]).name
            } -> ${
              catalogs[Catalogs[key]].find((item) => item.id === updated[key])
                .name
            };`;
          }
          return `${itemNames[key]}: ${prev[key]} -> ${updated[key]};`;
        })
        .join(' '),
      inventorynumber: id,
      // author: user.fio,
    });

    return updated;
  }

  async deleteItem(id: number) {
    return await this.itemsRepository.destroy({
      where: { inventorynumber: id },
    });
  }
}
