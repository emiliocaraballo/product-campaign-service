import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/infrastructure/database/entities/product.entity';
import { Product } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product-repository.interface';

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
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      sku: product.sku,
      description: product.description,
    }));
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    return product
      ? {
          id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          sku: product.sku,
          description: product.description,
        }
      : null;
  }
}
