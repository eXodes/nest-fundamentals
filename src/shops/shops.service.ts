import { Injectable, NotFoundException } from '@nestjs/common';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopsService {
  private shops: Shop[] = [
    {
      id: 1,
      name: 'Tiny Venture',
      email: 'venture@example.com',
    },
  ];

  findAll(): Shop[] {
    return this.shops;
  }

  findOne(id: number) {
    const shop = this.shops.find((shop) => shop.id === id);

    if (!shop) {
      throw new NotFoundException(`Shop #${id} not found`);
    }

    return shop;
  }

  create(createShopDto: CreateShopDto) {
    const shop = {
      id: this.shops.length + 1,
      ...createShopDto,
    };

    this.shops.push(shop);

    return shop;
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    let current = this.findOne(id);

    if (current) {
      current = {
        ...current,
        ...updateShopDto,
      };

      this.shops = this.shops.map((shop) => (shop.id === id ? current : shop));
    }

    return current;
  }

  remove(id: number) {
    const shop = this.findOne(id);

    if (shop) {
      this.shops = this.shops.filter((s) => s.id !== id);
    }

    return shop;
  }
}
