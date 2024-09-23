import { Product } from 'src/domain/entities/product/product.entity';

export class CartProduct {
  constructor(
    // readonly id: number,
    readonly cartId: number,
    // readonly productId: number,
    readonly product: Product,
    public quantity: number,
  ) {}
}
