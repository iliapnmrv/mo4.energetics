import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { DeleteFileDto } from './dto/delete-file.dto';

export enum FileType {
  IMAGE = 'image',
  DOCS = 'docs',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file: Express.Multer.File): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  deleteFile(dto: DeleteFileDto): void {
    console.log(dto);

    for (const filePath of dto.files) {
      const file = path.resolve(__dirname, '..', 'static', filePath);
      console.log(file);

      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    }
  }
}
