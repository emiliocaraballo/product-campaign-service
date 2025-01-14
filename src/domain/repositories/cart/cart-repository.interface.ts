import { Cart } from 'src/domain/entities/cart/cart.entity';

export interface CartRepository {
  findByUserIdOrSession(userId: number, session: string): Promise<Cart>;
  save(cart: Cart): Promise<Cart>;
}
