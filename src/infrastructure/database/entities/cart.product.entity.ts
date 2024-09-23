import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'carts_products' })
export class CartProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cart_id' })
  cartId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @OneToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column()
  quantity: number;
}
