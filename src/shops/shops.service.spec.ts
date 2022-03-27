import { Test, TestingModule } from '@nestjs/testing';
import { ShopsService } from './shops.service';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Shop } from './entities/shop.entity';
import shopsConfig from './config/shops.config';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('ShopsService', () => {
  let service: ShopsService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopsService,
        {
          provide: Connection,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Shop),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Category),
          useValue: createMockRepository(),
        },
        {
          provide: shopsConfig.KEY,
          useValue: {},
        },
      ],
    }).compile();

    // For request scoped providers
    // service = await module.resolve<ShopsService>(ShopsService);
    service = module.get<ShopsService>(ShopsService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Shop));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when the shop exists', () => {
      it('should return the shop', async () => {
        const shopId = 1;
        const expectedShop = {};

        coffeeRepository.findOne.mockReturnValue(expectedShop);

        const shop = await service.findOne(shopId);
        expect(shop).toEqual(expectedShop);
      });
    });

    describe('when the shop does not exist', () => {
      it('should throw the "NotFoundException"', async () => {
        const shopId = 1;

        coffeeRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(shopId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Shop #${shopId} not found`);
        }
      });
    });
  });
});
