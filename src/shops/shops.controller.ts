import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {
    console.log('ShopsController created');
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.shopsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.shopsService.findOne(id);
  }

  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.shopsService.remove(id);
  }
}
