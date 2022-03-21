import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeregistrationService } from './deregistration.service';
import { CreateDeregistrationDto } from './dto/create-repair.dto';

@Controller('deregistration')
export class DeregistrationController {
  constructor(private deregistrationService: DeregistrationService) {}

  @Post('/:id')
  @UseInterceptors(FilesInterceptor('files'))
  createDeregistration(
    @Param('id') id: number,
    @Body() dto: CreateDeregistrationDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.deregistrationService.createDeregistration(id, dto, files);
  }
}
