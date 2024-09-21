import { Product } from 'src/domain/entities/product.entity';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
}
