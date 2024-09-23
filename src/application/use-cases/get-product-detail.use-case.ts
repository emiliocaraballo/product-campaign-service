import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repositories/product-repository.interface';
import { Product } from 'src/domain/entities/product.entity';
import { GetProductDetailPort } from '../repositories/get-product-detail-port.interface';

@Injectable()
export class GetProductDetailUseCase implements GetProductDetailPort {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: number): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}
