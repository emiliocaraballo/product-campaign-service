import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetProductsUseCase } from 'src/application/use-cases/get-products.use-case';
import { GetProductDetailUseCase } from 'src/application/use-cases/get-product-detail.use-case';
import { Product } from 'src/domain/entities/product/product.entity';
import { PageDto, PageOptionsDto } from '../dtos/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductDetailUseCase: GetProductDetailUseCase,
  ) {}

  @Get('list')
  async getProducts(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Product>> {
    return this.getProductsUseCase.execute(pageOptionsDto);
  }

  @Get('detail/:id')
  async getProductDetail(@Param('id') id: number): Promise<Product> {
    return this.getProductDetailUseCase.execute(id);
  }
}
