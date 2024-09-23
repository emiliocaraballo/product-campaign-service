import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddProductToCartUseCase } from 'src/application/use-cases/add-product-to-cart.use-case';
import { GetCartProductUseCase } from 'src/application/use-cases/get-cart-product.use-case';
import { CartProduct } from 'src/domain/entities/cart/cart.product.entity';
import { AddToCartDTO } from '../dtos/cart/add-to-cart.dto';

@Controller('cart')
@ApiTags('cart')
export class CartController {
  constructor(
    private readonly getCartProductUseCase: GetCartProductUseCase,
    private readonly addProductToCartUseCase: AddProductToCartUseCase,
  ) {}

  @Get()
  @ApiQuery({ name: 'session', required: false })
  async getCartProduct(@Query('session') session: string): Promise<CartProduct[]> {
    const userId = null;
    return this.getCartProductUseCase.execute(userId, session);
  }

  @Post('add-product')
  async addProductToCart(@Body() body: AddToCartDTO): Promise<CartProduct> {
    const userId = null;
    return this.addProductToCartUseCase.execute({
      userId,
      productId: body.productId,
      quantity: body.quantity,
      session: body.session,
      type: body.type,
    });
  }
}
