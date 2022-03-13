import { Test, TestingModule } from '@nestjs/testing';
import { ShopRatingService } from './shop-rating.service';

describe('ShopRatingService', () => {
  let service: ShopRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopRatingService],
    }).compile();

    service = module.get<ShopRatingService>(ShopRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
