import { Module } from '@nestjs/common';
import { DeregistrationService } from './deregistration.service';
import { DeregistrationController } from './deregistration.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Deregistration } from './models/deregistration.model';

@Module({
  imports: [SequelizeModule.forFeature([Deregistration])],
  providers: [DeregistrationService],
  controllers: [DeregistrationController],
})
export class DeregistrationModule {}
