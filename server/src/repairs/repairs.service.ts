import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRepairDto } from './dto/create-repair.dto';
import { Repair } from './models/repairs.model';

@Injectable()
export class RepairsService {
  constructor(@InjectModel(Repair) private repairRepository: typeof Repair) {}
  async createRepair(id: number, dto: CreateRepairDto) {
    const repair = await this.repairRepository.create({
      ...dto,
      inventorynumber: id,
    });
    return repair;
  }
}
