import { Product } from 'src/domain/entities/product.entity';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
}
