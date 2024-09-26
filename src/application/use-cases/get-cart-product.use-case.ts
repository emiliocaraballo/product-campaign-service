import { Inject } from '@nestjs/common';
import { CartProduct } from 'src/domain/entities/cart/cart.product.entity';
import { GetCartProduct } from 'src/application/repositories/get-cart-product.interface';
import { ICartProductRepository } from 'src/domain/repositories/cart/cart-product-repository.interface';
import { Injectable } from '@nestjs/common';
import { ICartRepository } from 'src/domain/repositories/cart/cart-repository.interface';
import { Cart } from 'src/domain/entities/cart/cart.entity';
import { ExceptionError } from 'src/infrastructure/filters/exceptionError';
import messageError from '../message/message-error';

@Injectable()
export class GetCartProductUseCase implements GetCartProduct {
  constructor(
    @Inject('CartProductRepository')
    private readonly cartProductRepository: ICartProductRepository,
    @Inject('CartRepository')
    private readonly cartRepository: ICartRepository,
  ) {}

  async execute(userId: number, session: string): Promise<CartProduct[]> {
    // obtener el carrito de usuario o de la sesion.
    const cart: Cart = await this.cartRepository.findByUserIdOrSession(userId, session);
    if (!cart) {
      throw new ExceptionError(messageError.messageErrorCartNotFound);
    }
    // obtener todos los productos del carrito.
    const cartProducts = await this.cartProductRepository.findByCartId(cart.id);
    if (!cartProducts || cartProducts?.length == 0) {
      throw new ExceptionError(messageError.messageErrorProductNotFound);
    }
    return cartProducts;
  }
}
