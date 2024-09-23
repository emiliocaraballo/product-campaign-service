import { EnumType } from './emun.type.dto';

export class AddToCartDTO {
  session: string;
  userId: number;
  productId: number;
  quantity: number;
  type: EnumType;
}
