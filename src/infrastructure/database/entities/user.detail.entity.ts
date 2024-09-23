import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'users_details' })
export class UserDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  @Column({ name: 'user_id' })
  user: UserEntity;

  @Column()
  identification: string;

  @Column()
  gmail: string;

  @Column()
  phone: string;

  @Column({})
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  address: string;
}
