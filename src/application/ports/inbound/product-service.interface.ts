import { Product } from 'src/domain/entities/product.entity';

export interface IProductService {
  getAllProducts(): Promise<Product[]>;
}
