import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { Category } from './entities/category.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { SHOP_CATEGORIES } from './shops.constants';

@Injectable({ scope: Scope.REQUEST })
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly connection: Connection,
    @Inject(SHOP_CATEGORIES) shopCategories: string,
  ) {
    console.log('Shop service instantiated');
    console.log(shopCategories);
  }

  private async preloadCategoryByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { name: name },
    });

    if (category) {
      return category;
    }

    return this.categoryRepository.create({ name });
  }

  async recommendShops(shop: Shop) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      shop.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_shop';
      recommendEvent.type = 'shop';
      recommendEvent.payload = {
        shopId: shop.id,
      };

      await queryRunner.manager.save(shop);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<Shop[]> {
    const { limit, offset } = paginationQuery;

    return this.shopRepository.find({
      relations: ['categories'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Shop> {
    const shop = await this.shopRepository.findOne(id, {
      relations: ['categories'],
    });

    if (!shop) {
      throw new NotFoundException(`Shop #${id} not found`);
    }

    return shop;
  }

  async create(createShopDto: CreateShopDto) {
    const categories = await Promise.all(
      createShopDto.categories.map(async (name) =>
        this.preloadCategoryByName(name),
      ),
    );

    const shop = this.shopRepository.create({ ...createShopDto, categories });

    return this.shopRepository.save(shop);
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const categories =
      updateShopDto.categories &&
      (await Promise.all(
        updateShopDto.categories.map(async (name) =>
          this.preloadCategoryByName(name),
        ),
      ));

    const shop = await this.shopRepository.preload({
      id,
      ...updateShopDto,
      categories,
    });

    if (!shop) {
      throw new NotFoundException(`Shop #${id} not found`);
    }

    return this.shopRepository.save(shop);
  }

  async remove(id: number) {
    const shop = await this.findOne(id);

    return this.shopRepository.remove(shop);
  }
}
