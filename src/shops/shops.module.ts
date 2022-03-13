import { Injectable, Module, Scope } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Category } from './entities/category.entity';
import { Event } from '../events/entities/event.entity';
import { SHOP_CATEGORIES } from './shops.constants';

const production = process.env.NODE_ENV === 'production';

class ConfigService {}
class DevConfigService {}
class ProdConfigService {}

@Injectable()
export class ShopCategoryFactory {
  async create() {
    return ['lifestyle', 'electronics'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Category, Event])],
  controllers: [ShopsController],
  providers: [
    ShopsService,
    ShopCategoryFactory,
    {
      provide: ConfigService,
      useClass: production ? ProdConfigService : DevConfigService,
    },
    {
      provide: SHOP_CATEGORIES,
      useFactory: async (categories: ShopCategoryFactory) => {
        const category = await categories.create();

        console.log('[!] Async Factory');

        return category;
      },
      inject: [ShopCategoryFactory],
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [ShopsService],
})
export class ShopsModule {}
