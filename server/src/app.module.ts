import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { RepairsService } from './repairs/repairs.service';
import { RepairsController } from './repairs/repairs.controller';
import { RepairsModule } from './repairs/repairs.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Item } from './item/models/item.model';
import { DeregistrationModule } from './deregistration/deregistration.module';
import { Repair } from './repairs/models/repairs.model';
import { Deregistration } from './deregistration/models/deregistration.model';
import { Place } from './item/models/places.model';
import { Person } from './item/models/persons.model';
import { Status } from './item/models/statuses.model';
import { Type } from './item/models/types.model';
import { RepairsType } from './repairs/models/types.model';
import { CatalogsModule } from './catalogs/catalogs.module';
import { RepairsDecision } from './repairs/models/decision.model';
import { FileModule } from './file/file.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    ItemModule,
    RepairsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      models: [
        Item,
        Repair,
        Type,
        Deregistration,
        Place,
        Person,
        Status,
        RepairsType,
        RepairsDecision,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    DeregistrationModule,
    CatalogsModule,
    FileModule,
  ],
})
export class AppModule {}
