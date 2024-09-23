import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from '../controllers/cart.controller';
import { CartProductRepositoryTypeORM } from 'src/infrastructure/database/repositories/cart.product.repository';
import { CartRepositoryTypeORM } from 'src/infrastructure/database/repositories/cart.repository';
import { CartProductEntity } from 'src/infrastructure/database/entities/cart.product.entity';
import { CartEntity } from 'src/infrastructure/database/entities/cart.entity';
import { GetCartProductUseCase } from 'src/application/use-cases/get-cart-product.use-case';
import { AddProductToCartUseCase } from 'src/application/use-cases/add-product-to-cart.use-case';
import { ProductRepositoryTypeORM } from 'src/infrastructure/database/repositories/product.repository';
import { ProductEntity } from 'src/infrastructure/database/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, CartProductEntity, ProductEntity])],
  controllers: [CartController],
  providers: [
    GetCartProductUseCase,
    AddProductToCartUseCase,
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryTypeORM,
    },
    {
      provide: 'CartRepository',
      useClass: CartRepositoryTypeORM,
    },
    {
      provide: 'CartProductRepository',
      useClass: CartProductRepositoryTypeORM,
    },
  ],
  exports: ['ProductRepository', 'CartRepository', 'CartProductRepository'], // Esto es opcional, solo si necesitas exportarlo
})
export class CartModule {}
