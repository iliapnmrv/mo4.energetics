import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateRepairDto } from './dto/create-repair.dto';
import { RepairsService } from './repairs.service';

@Controller('repairs')
export class RepairsController {
  constructor(private repairsService: RepairsService) {}

  @Post('/:id')
  createRepair(@Param('id') id: number, @Body() dto: CreateRepairDto) {
    return this.repairsService.createRepair(id, dto);
  }
}
