import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { RepairsService } from './repairs/repairs.service';
import { RepairsController } from './repairs/repairs.controller';
import { RepairsModule } from './repairs/repairs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ItemModule,
    RepairsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'energetics',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
  ],
  controllers: [AppController, RepairsController],
  providers: [AppService, RepairsService],
})
export class AppModule {}
