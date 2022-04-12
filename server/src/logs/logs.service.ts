import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './models/logs.model';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log) private logsRepository: typeof Log) {}

  async createActivityLog(id: number, dto: CreateLogDto) {
    console.log('logs', dto, id);

    const log = await this.logsRepository.create({
      inventorynumber: id,
      action: dto.action,
    });
    return log;
  }
}
