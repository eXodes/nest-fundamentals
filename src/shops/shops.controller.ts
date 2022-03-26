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
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Public()
  @Get()
  async findAll(
    @Protocol() protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log('[PROTOCOL]:', protocol);
    return this.shopsService.findAll(paginationQuery);
  }

  @ApiForbiddenResponse({
    description: 'Forbidden resource',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
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
