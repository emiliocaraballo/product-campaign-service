import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetProductsUseCase } from 'src/application/use-cases/get-products.use-case';
import { GetProductDetailUseCase } from 'src/application/use-cases/get-product-detail.use-case';
import { Product } from 'src/domain/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductDetailUseCase: GetProductDetailUseCase,
  ) {}

  @Get()
  async getProducts(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<Product[]> {
    return this.getProductsUseCase.execute(page, limit);
  }

  @Get(':id')
  async getProductDetail(@Param('id') id: number): Promise<Product> {
    return this.getProductDetailUseCase.execute(id);
  }
}
