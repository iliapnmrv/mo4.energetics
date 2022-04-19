import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileService, FileType } from 'src/file/file.service';
import { CreateDeregistrationDto } from './dto/create-deregistration.dto';
import { UpdateDeregistrationDto } from './dto/update-deregistration.dto';
import { Deregistration, IFile } from './models/deregistration.model';

@Injectable()
export class DeregistrationService {
  constructor(
    @InjectModel(Deregistration)
    private deregistrationRepository: typeof Deregistration,
    private fileService: FileService,
  ) {}

  async getDeregistration(id: number) {
    const deregistration = await this.deregistrationRepository.findOne({
      where: { id },
    });
    return deregistration;
  }

  async createDeregistration(
    id: number,
    dto: CreateDeregistrationDto,
    files: Express.Multer.File[],
  ) {
    const attachments: Array<IFile> = [];
    if (files.length) {
      for (const attachment of files) {
        const imagePath = this.fileService.createFile(
          FileType.IMAGE,
          attachment,
        );
        attachments.push({ path: imagePath, name: attachment.originalname });
      }
    }
    const deregistration = await this.deregistrationRepository.create({
      ...dto,
      inventorynumber: id,
      attachments,
    });
    return deregistration;
  }

  async updateDeregistration(
    id: number,
    dto: UpdateDeregistrationDto,
    files: Express.Multer.File[],
  ) {
    const attachments: Array<IFile | string> = [];

    console.log(id, dto, files);
    console.log(typeof dto.attachments);

    if (typeof dto.attachments === 'object') {
      for (let i = 0; i < dto.attachments.length; i++) {
        attachments.push(JSON.parse(dto.attachments[i]));
      }
    } else {
      if (typeof dto.attachments !== 'string') {
        attachments.push(JSON.parse(dto.attachments));
      }
    }
    if (files.length) {
      for (const attachment of files) {
        const imagePath = this.fileService.createFile(
          FileType.IMAGE,
          attachment,
        );
        attachments.push({
          path: imagePath,
          name: attachment.originalname,
        });
      }
    }
    console.log(attachments);

    for (const key in dto) {
      await this.deregistrationRepository.update(
        {
          [key]: key === 'attachments' ? attachments : dto[key],
        },
        { where: { id } },
      );
    }
    return await this.deregistrationRepository.findOne({
      where: { id },
    });
  }

  async deleteDeregistration(id: number) {
    return await this.deregistrationRepository.destroy({
      where: { id },
    });
  }
}
