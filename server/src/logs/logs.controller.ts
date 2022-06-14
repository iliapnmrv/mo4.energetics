import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private logsService: LogsService) {}

  @Post('/:id')
  createRepair(@Param('id') id: number, @Body() dto: CreateLogDto) {
    return this.logsService.createActivityLog(id, dto);
  }
}
