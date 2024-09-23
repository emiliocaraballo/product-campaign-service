import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'carts' })
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  session: string;
}
