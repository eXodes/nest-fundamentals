import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Category } from './entities/category.entity';
import { Event } from '../events/entities/event.entity';
import { ConfigModule } from '@nestjs/config';
import shopsConfig from './config/shops.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop, Category, Event]),
    ConfigModule.forFeature(shopsConfig),
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}
