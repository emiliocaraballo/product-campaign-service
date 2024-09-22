import { Product } from 'src/domain/entities/product.entity';

export interface GetProductDetailPort {
  execute(id: number): Promise<Product>;
}
