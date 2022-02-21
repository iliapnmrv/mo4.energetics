import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRepairDto } from './dto/create-repair.dto';
import { Repair } from './models/repairs.model';

@Injectable()
export class RepairsService {
  constructor(@InjectModel(Repair) private repairRepository: typeof Repair) {}
  async createRepair(dto: CreateRepairDto) {
    const repair = await this.repairRepository.create({ ...dto });
    return repair;
  }
}
