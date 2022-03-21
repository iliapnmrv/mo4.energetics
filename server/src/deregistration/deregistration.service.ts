import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileService, FileType } from 'src/file/file.service';
import { CreateDeregistrationDto } from './dto/create-repair.dto';
import { Deregistration } from './models/deregistration.model';

@Injectable()
export class DeregistrationService {
  constructor(
    @InjectModel(Deregistration)
    private deregistrationRepository: typeof Deregistration,
    private fileService: FileService,
  ) {}

  async createDeregistration(
    id: number,
    dto: CreateDeregistrationDto,
    files: Express.Multer.File[],
  ) {
    console.log(dto, files);

    const attachments: Array<string> = [];
    if (files) {
      for (const attachment of files) {
        const imagePath = this.fileService.createFile(
          FileType.IMAGE,
          attachment,
        );
        attachments.push(imagePath);
      }
    }
    const deregistration = await this.deregistrationRepository.create({
      ...dto,
      inventorynumber: id,
      attachments,
    });
    return deregistration;
  }
}
