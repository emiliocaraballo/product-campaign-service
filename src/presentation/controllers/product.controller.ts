import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductUseCase } from 'src/application/use-cases/product-use-cases.service';
import { Product } from 'src/domain/entities/product.entity';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productUseCase.getAllProducts();
  }
}
