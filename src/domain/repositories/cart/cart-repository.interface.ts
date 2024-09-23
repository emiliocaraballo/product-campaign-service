import { Cart } from 'src/domain/entities/cart/cart.entity';

export interface ICartRepository {
  findByUserIdOrSession(userId: number, session: string): Promise<Cart>;
  save(cart: Cart): Promise<Cart>;
}
