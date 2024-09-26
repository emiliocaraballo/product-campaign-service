import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartProductEntity } from 'src/infrastructure/database/entities/cart.product.entity';
import { ICartProductRepository } from 'src/domain/repositories/cart/cart-product-repository.interface';
import { Product } from 'src/domain/entities/product/product.entity';
import { CartProduct } from 'src/domain/entities/cart/cart.product.entity';
import { ExceptionError } from 'src/infrastructure/filters/exceptionError';
import messageError from 'src/application/message/message-error';

@Injectable()
export class CartProductRepositoryTypeORM implements ICartProductRepository {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
  ) {}

  async delete(cartProduct: CartProductEntity): Promise<CartProduct> {
    await this.cartProductRepository.delete({ id: cartProduct?.id, cartId: cartProduct?.cartId });
    return cartProduct;
  }

  async findByCartId(cartId: number): Promise<CartProduct[]> {
    const cartProducts = await this.cartProductRepository.find({
      where: { cartId },
      relations: ['product'],
    });

    return cartProducts.map((cartProduct) => {
      const product = cartProduct?.product
        ? new Product(
            cartProduct?.product?.id,
            cartProduct?.product?.name,
            cartProduct?.product?.price,
            cartProduct?.product?.stock,
            cartProduct?.product?.sku,
            cartProduct?.product?.urlImage,
            cartProduct?.product?.description,
          )
        : null;

      return new CartProduct(
        // cartProduct.id,
        cartProduct?.cartId,
        product, // Mapea el producto si existe
        cartProduct?.quantity,
      );
    });
  }

  async save(cartProduct: CartProductEntity): Promise<CartProduct> {
    const response = await this.cartProductRepository.save(cartProduct);
    return response;
  }

  async update(cartProduct: CartProductEntity): Promise<CartProduct> {
    const response = await this.cartProductRepository.update(
      { id: cartProduct.id },
      { quantity: cartProduct.quantity },
    );
    if (response.affected === 0) {
      throw new ExceptionError(messageError.messageErrorCartNotFound);
    }
    return this.findByCartIdAndProductId(cartProduct.cartId, cartProduct.productId);
  }

  async findByCartIdAndProductId(cartId: number, productId: number): Promise<CartProduct> {
    const cartProduct = await this.cartProductRepository.findOne({ where: { cartId, productId } });
    return cartProduct;
  }
}
