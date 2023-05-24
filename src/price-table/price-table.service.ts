import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePriceTableDto } from './dto/create-price-table.dto'
import { UpdatePriceTableDto } from './dto/update-price-table.dto'
import { PriceTable } from './entities/price-table.entity'

@Injectable()
export class PriceTableService {
  constructor(
    @InjectRepository(PriceTable)
    private readonly priceTableRepository: Repository<PriceTable>,
  ) {}

  create(createPriceTableDto: CreatePriceTableDto): Promise<PriceTable> {
    if (createPriceTableDto.effective_from < createPriceTableDto.effective_to) {
      return this.priceTableRepository.save(createPriceTableDto)
    } else {
      return Promise.reject(new Error('fail'))
    }
  }

  findAll() {
    return this.priceTableRepository.find()
  }

  findOne(id: number) {
    return this.priceTableRepository.findOne()
  }

  update(id: number, updatePriceTableDto: UpdatePriceTableDto) {
    return `This action updates a #${id} priceTable`
  }

  remove(id: number) {
    return `This action removes a #${id} priceTable`
  }
}
