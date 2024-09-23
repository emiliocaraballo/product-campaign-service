import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/infrastructure/database/entities/product.entity';
import { Product } from 'src/domain/entities/product/product.entity';
import { IProductRepository } from 'src/domain/repositories/product/product-repository.interface';

@Injectable()
export class ProductRepositoryTypeORM implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(page: number, limit: number): Promise<Product[]> {
    const products = await this.productRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return products.map(
      (product) =>
        new Product(
          product?.id,
          product?.name,
          product?.price,
          product?.stock,
          product?.sku,
          product?.urlImage,
          product?.description,
        ),
    );
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    return new Product(
      product?.id,
      product?.name,
      product?.price,
      product?.stock,
      product?.sku,
      product?.urlImage,
      product?.description,
    );
  }
}
