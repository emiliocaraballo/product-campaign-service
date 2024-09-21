import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IProductService } from 'src/application/ports/inbound/product-service.interface';
import { IProductRepository } from 'src/application/ports/outbound/product-repository.interface';
import { Product } from 'src/domain/entities/product.entity';
import { customThrowError } from 'src/infrastructure/filters/customThrowError';

@Injectable()
export class ProductUseCase implements IProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const product = await this.productRepository.findAll();
    if (!product || product?.length == 0) {
      throw customThrowError({
        resultCode: -1,
        code: '1',
        description: '1',
        title: '1',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return product;
  }
}
