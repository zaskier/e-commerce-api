import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceTableService } from './price-table.service';
import { CreatePriceTableDto } from './dto/create-price-table.dto';
import { UpdatePriceTableDto } from './dto/update-price-table.dto';

@Controller('price-table')
export class PriceTableController {
  constructor(private readonly priceTableService: PriceTableService) {}

  @Post()
  create(@Body() createPriceTableDto: CreatePriceTableDto) : Promise<any> {
    return this.priceTableService.create(createPriceTableDto);
  }

  @Get()
  findAll() {
    return this.priceTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceTableDto: UpdatePriceTableDto) {
    return this.priceTableService.update(+id, updatePriceTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceTableService.remove(+id);
  }
}
