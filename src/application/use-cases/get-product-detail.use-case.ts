import { GetProductDetailPort } from 'src/application/repositories/get-product-detail-port.interface';
import { IProductRepository } from 'src/domain/repositories/product-repository.interface';
import { Product } from 'src/domain/entities/product.entity';
import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class GetProductDetailUseCase implements GetProductDetailPort {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: number): Promise<Product> {
    return this.productRepository.findById(id);
  }
}
