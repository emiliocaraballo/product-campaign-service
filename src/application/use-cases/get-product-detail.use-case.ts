import { Inject } from '@nestjs/common';
import { ProductRepository } from 'src/domain/repositories/product/product-repository.interface';
import { Product } from 'src/domain/entities/product/product.entity';
import { GetProductDetail } from '../repositories/get-product-detail.interface';

export class GetProductDetailUseCase implements GetProductDetail {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: number): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}
