import { CartProduct } from 'src/domain/entities/cart/cart.product.entity';
import { AddToCartDTO } from '../dtos/add-to-cart.dto';

export interface AddProductToCart {
  execute(body: AddToCartDTO): Promise<CartProduct>;
}
