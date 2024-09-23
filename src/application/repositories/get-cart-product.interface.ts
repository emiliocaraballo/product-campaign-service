import { CartProduct } from 'src/domain/entities/cart/cart.product.entity';

export interface GetCartProduct {
  execute(userId: number, session: string): Promise<CartProduct[]>;
}
