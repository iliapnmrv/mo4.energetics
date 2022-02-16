import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { RepairsService } from './repairs/repairs.service';
import { RepairsController } from './repairs/repairs.controller';
import { RepairsModule } from './repairs/repairs.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Item } from './item/models/item.model';
import { DeregistrationModule } from './deregistration/deregistration.module';

@Module({
  imports: [
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
      models: [Item],
      autoLoadModels: true,
    }),
    DeregistrationModule,
  ],
  controllers: [RepairsController],
  providers: [RepairsService],
})
export class AppModule {}
