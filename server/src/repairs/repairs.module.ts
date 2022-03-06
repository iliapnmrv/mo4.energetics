import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RepairsDecision } from './models/decision.model';
import { Repair } from './models/repairs.model';
import { RepairsType } from './models/types.model';
import { RepairsController } from './repairs.controller';
import { RepairsService } from './repairs.service';

@Module({
  imports: [SequelizeModule.forFeature([Repair, RepairsType, RepairsDecision])],
  controllers: [RepairsController],
  providers: [RepairsService],
})
export class RepairsModule {}
