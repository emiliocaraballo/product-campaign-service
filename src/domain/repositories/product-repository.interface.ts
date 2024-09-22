import { Product } from '../entities/product.entity';

export interface IProductRepository {
  findAll(page: number, limit: number): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
}
