import { Body, Controller, Delete } from '@nestjs/common';
import { DeleteFileDto } from './dto/delete-file.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Delete('')
  createDeregistration(@Body() dto: DeleteFileDto) {
    return this.fileService.deleteFile(dto);
  }
}
