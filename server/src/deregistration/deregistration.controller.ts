import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeregistrationService } from './deregistration.service';
import { CreateDeregistrationDto } from './dto/create-deregistration.dto';
import { UpdateDeregistrationDto } from './dto/update-deregistration.dto';

@Controller('deregistration')
export class DeregistrationController {
  constructor(private deregistrationService: DeregistrationService) {}

  @Get('/:id')
  getDeregistration(@Param('id') id: number) {
    return this.deregistrationService.getDeregistration(id);
  }

  @Post('/:id')
  @UseInterceptors(FilesInterceptor('files'))
  createDeregistration(
    @Param('id') id: number,
    @Body() dto: CreateDeregistrationDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.deregistrationService.createDeregistration(id, dto, files);
  }

  @Put('/:id')
  @UseInterceptors(FilesInterceptor('files'))
  updateDeregistration(
    @Param('id') id: number,
    @Body() dto: UpdateDeregistrationDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.deregistrationService.updateDeregistration(id, dto, files);
  }
}
