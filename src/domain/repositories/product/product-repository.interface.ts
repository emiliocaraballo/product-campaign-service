import { Product } from 'src/domain/entities/product/product.entity';

export interface ProductRepository {
  findAll(page: number, limit: number): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
}
