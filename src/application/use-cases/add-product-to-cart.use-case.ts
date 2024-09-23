import { Inject, Injectable } from '@nestjs/common';
import { AddProductToCart } from '../repositories/add-product-to-cart.use-case';
import { CartProduct } from 'src/domain/entities/cart/cart.product.entity';
import { ICartProductRepository } from 'src/domain/repositories/cart/cart-product-repository.interface';
import { IProductRepository } from 'src/domain/repositories/product/product-repository.interface';
import { ExceptionError } from 'src/infrastructure/filters/exceptionError';
import { ICartRepository } from 'src/domain/repositories/cart/cart-repository.interface';
import { Cart } from 'src/domain/entities/cart/cart.entity';
import { EnumType } from '../dtos/emun.type.dto';
import { AddToCartDTO } from '../dtos/add-to-cart.dto';

@Injectable()
export class AddProductToCartUseCase implements AddProductToCart {
  constructor(
    @Inject('CartRepository')
    private readonly cartRepository: ICartRepository,
    @Inject('CartProductRepository')
    private readonly cartProductRepository: ICartProductRepository,
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(body: AddToCartDTO): Promise<CartProduct> {
    // Validar si el producto existe
    const product = await this.productRepository.findById(body.productId);
    if (!product?.id) {
      throw new ExceptionError({ resultCode: 1, description: 'No existe este product', code: 'product_not_found' });
    }

    // Verificar si el carrito existe
    let cart = await this.cartRepository.findByUserIdOrSession(body.userId, body.session);
    if (!cart?.id) {
      cart = await this.cartRepository.save(new Cart(0, body.userId, body.session));
    } else {
      // si ya existe el carrito actualizamos la data de userId en caso de venir de una sesión.
      if (cart?.userId == null && cart?.userId != body.userId) {
        cart = await this.cartRepository.save({ id: cart.id, userId: body.userId, session: body.session });
      }
    }

    // Verificar si el producto ya existe en el carrito
    const existingCartProduct = await this.cartProductRepository.findByCartIdAndProductId(cart.id, body.productId);

    if (existingCartProduct) {
      // Si el producto ya existe, actualizamos la cantidad
      if (body.type == EnumType.subtract) {
        existingCartProduct.quantity -= body.quantity;
        if (existingCartProduct.quantity <= 0) {
          return await this.cartProductRepository.delete(existingCartProduct);
        }
        return await this.cartProductRepository.update(existingCartProduct);
      } else if (body.type == EnumType.delete) {
        return await this.cartProductRepository.delete(existingCartProduct);
      } else {
        existingCartProduct.quantity += body.quantity;
        return await this.cartProductRepository.update(existingCartProduct);
      }
    }

    // Si no existe, crear uno nuevo
    const newCartProduct = new CartProduct(cart.id, product, body.quantity);
    return await this.cartProductRepository.save(newCartProduct);
  }
}
