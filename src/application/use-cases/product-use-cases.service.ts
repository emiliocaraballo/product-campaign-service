import { Inject, Injectable } from '@nestjs/common';
import { IProductService } from 'src/application/ports/inbound/product-service.interface';
import { IProductRepository } from 'src/application/ports/outbound/product-repository.interface';
import { Product } from 'src/domain/entities/product.entity';

@Injectable()
export class ProductUseCase implements IProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const product = await this.productRepository.findAll();
    if (!product || product?.length == 0) throw new Error('Product not found');
    return product;
  }
}
