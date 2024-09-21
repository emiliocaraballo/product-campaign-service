// src/infrastructure/database/product.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IProductRepository } from 'src/application/ports/outbound/product-repository.interface';
import { Product } from 'src/domain/entities/product.entity';
import { ProductEntity } from 'src/infrastructure/database/entities/product.entity';

@Injectable()
export class ProductTypeOrmRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<Product[] | null> {
    const products = await this.repository.find();
    return products.map(
      (product) =>
        new Product(product.id, product.name, product.price, product.stock, product.sku, product.description),
    );
  }
}
