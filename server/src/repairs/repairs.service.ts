import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { Repair } from './models/repairs.model';

@Injectable()
export class RepairsService {
  constructor(@InjectModel(Repair) private repairRepository: typeof Repair) {}

  async createRepair(id: number, dto: CreateRepairDto) {
    console.log(id, dto);

    const repair = await this.repairRepository.create({
      ...dto,
      inventorynumber: id,
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
