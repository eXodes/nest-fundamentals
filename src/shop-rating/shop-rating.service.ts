import { Injectable } from '@nestjs/common';
import { ShopsService } from '../shops/shops.service';

@Injectable()
export class ShopRatingService {
  constructor(private readonly shopsService: ShopsService) {}
}
