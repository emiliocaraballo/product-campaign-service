import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

enum EnumType {
  add = 'ADD',
  subtract = 'SUBTRACT',
  delete = 'DELETE',
}

export class AddToCartDTO {
  @ApiProperty({ description: 'sesión', type: String })
  @IsString()
  session: string;

  @IsNumber()
  @ApiProperty({ description: 'ID del product', type: Number })
  productId: number;

  @ApiProperty({ description: 'cantidad del producto', type: Number })
  @IsNumber({}, { message: 'quantity debe ser un número' })
  quantity: number;

  @ApiProperty({ enum: ['ADD', 'SUBTRACT', 'DELETE'] })
  type: EnumType;
}
