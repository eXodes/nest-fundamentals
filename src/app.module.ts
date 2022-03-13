import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopsModule } from './shops/shops.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopRatingModule } from './shop-rating/shop-rating.module';
import { DatabaseModule } from './database/database.module';

const production = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'passwd',
      database: 'nest-app',
      autoLoadEntities: true,
      synchronize: !production,
    }),
    ShopsModule,
    ShopRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
