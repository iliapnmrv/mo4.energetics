import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { RepairsService } from './repairs.service';

@Controller('repairs')
export class RepairsController {
  constructor(private repairsService: RepairsService) {}

  @Post('/:id')
  createRepair(@Param('id') id: number, @Body() dto: CreateRepairDto) {
    return this.repairsService.createRepair(id, dto);
  }

  @Put('/:id')
  updateRepair(@Param('id') id: number, @Body() dto: UpdateRepairDto) {
    return this.repairsService.updateRepair(id, dto);
  }

  @Get('/:id')
  getRepair(@Param('id') id: number) {
    return this.repairsService.getRepair(id);
  }

  @Delete('/:id')
  deleteRepair(@Param('id') id: number) {
    return this.repairsService.deleteRepair(id);
  }
}
