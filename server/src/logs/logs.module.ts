import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { Log } from './models/logs.model';

@Module({
  imports: [SequelizeModule.forFeature([Log])],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
