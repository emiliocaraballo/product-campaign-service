import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ name: 'image_url' })
  urlImage: string;
}
