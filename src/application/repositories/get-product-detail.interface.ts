import { Product } from 'src/domain/entities/product/product.entity';

export interface GetProductDetail {
  execute(id: number): Promise<Product>;
}
