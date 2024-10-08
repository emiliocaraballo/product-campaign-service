import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/infrastructure/database/entities/product.entity';
import { ProductController } from '../controllers/product.controller';
import { GetProductsUseCase } from 'src/application/use-cases/get-products.use-case';
import { GetProductDetailUseCase } from 'src/application/use-cases/get-product-detail.use-case';
import { ProductRepositoryTypeORM } from 'src/infrastructure/database/repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    GetProductsUseCase,
    GetProductDetailUseCase,
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryTypeORM,
    },
  ],
  exports: ['ProductRepository'], // Esto es opcional, solo si necesitas exportarlo
})
export class ProductModule {}
