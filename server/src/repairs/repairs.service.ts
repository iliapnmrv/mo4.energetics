import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Log } from 'src/logs/models/logs.model';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { Repair } from './models/repairs.model';

@Injectable()
export class RepairsService {
  constructor(
    @InjectModel(Repair) private repairRepository: typeof Repair,
    @InjectModel(Log) private logsRepository: typeof Log,
  ) {}

  async createRepair(id: number, dto: CreateRepairDto) {
    const repair = await this.repairRepository.create({
      ...dto,
      inventorynumber: id,
    });
    await this.logsRepository.create({
      inventorynumber: id,
      action: `Создана заявка на ремонт №${dto.requestnumber}`,
    });
    return repair;
  }

  async updateRepair(id: number, dto: UpdateRepairDto) {
    const repair = await this.repairRepository.update(
      {
        ...dto,
      },
      { where: { requestnumber: id } },
    );
    return repair;
  }

  async getRepair(requestnumber: number) {
    const repair = await this.repairRepository.findOne({
      where: { requestnumber },
    });
    return repair;
  }

  async deleteRepair(requestnumber: number) {
    const repair = await this.repairRepository.destroy({
      where: { requestnumber },
    });
    return repair;
  }
}
