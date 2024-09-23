import { CartProduct } from 'src/domain/entities/cart/cart.product.entity';

export interface ICartProductRepository {
  findByCartId(cartId: number): Promise<CartProduct[]>;
  save(cartProduct: CartProduct): Promise<CartProduct>;
  update(cartProduct: CartProduct): Promise<CartProduct>;
  delete(cartProduct: CartProduct): Promise<CartProduct>;
  findByCartIdAndProductId(cartId: number, productId: number): Promise<CartProduct | null>;
}
