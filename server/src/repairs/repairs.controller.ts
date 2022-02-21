import { Body, Controller, Post } from '@nestjs/common';
import { CreateRepairDto } from './dto/create-repair.dto';
import { RepairsService } from './repairs.service';

@Controller('repairs')
export class RepairsController {
  constructor(private repairsService: RepairsService) {}

  @Post()
  createRepair(@Body() dto: CreateRepairDto) {
    return this.repairsService.createRepair(dto);
  }
}
