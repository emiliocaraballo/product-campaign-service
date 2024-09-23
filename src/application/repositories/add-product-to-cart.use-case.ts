import { CartProduct } from 'src/domain/entities/cart/cart.product.entity';
import { EnumType } from '../dtos/emun.type.dto';
import { AddToCartDTO } from '../dtos/add-to-cart.dto';

export interface AddProductToCart {
  execute(body: AddToCartDTO): Promise<CartProduct>;
}
