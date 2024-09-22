import { Product } from 'src/domain/entities/product.entity';

export interface GetProductsPort {
  execute(page: number, limit: number): Promise<Product[]>;
}
