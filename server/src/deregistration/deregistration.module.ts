import { Module } from '@nestjs/common';
import { DeregistrationService } from './deregistration.service';
import { DeregistrationController } from './deregistration.controller';

@Module({
  providers: [DeregistrationService],
  controllers: [DeregistrationController]
})
export class DeregistrationModule {}
