import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/infrastructure/database/entities/cart.entity';
import { ICartRepository } from 'src/domain/repositories/cart/cart-repository.interface';
import { Cart } from 'src/domain/entities/cart/cart.entity';

@Injectable()
export class CartRepositoryTypeORM implements ICartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async save(cart: Cart): Promise<Cart> {
    const response = await this.cartRepository.save({
      session: cart.session,
      userId: cart.userId,
    });
    return new Cart(response.id, cart.userId, cart.session);
  }

  async findByUserIdOrSession(userId: number, session: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: [{ userId }, { session }] });
    return new Cart(cart?.id, cart?.userId, cart?.session);
  }
}
