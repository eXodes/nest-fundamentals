import { Module } from '@nestjs/common';
import { ShopRatingService } from './shop-rating.service';
import { ShopsModule } from '../shops/shops.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'passwd',
      database: 'nest-app',
    }),
    ShopsModule,
  ],
  providers: [ShopRatingService],
})
export class ShopRatingModule {}
