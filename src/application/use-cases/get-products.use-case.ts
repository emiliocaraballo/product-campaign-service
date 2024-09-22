// src/application/use-cases/get-products.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { GetProductsPort } from 'src/application/repositories/get-products-port.interface';
import { IProductRepository } from 'src/domain/repositories/product-repository.interface';
import { Product } from 'src/domain/entities/product.entity';

@Injectable()
export class GetProductsUseCase implements GetProductsPort {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(page: number, limit: number): Promise<Product[]> {
    return this.productRepository.findAll(page, limit);
  }
}
