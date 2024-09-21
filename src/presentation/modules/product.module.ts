import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from 'src/presentation/controllers/product.controller';
import { ProductTypeOrmRepository } from 'src/infrastructure/database/repositories/product.repository';
import { ProductUseCase } from 'src/application/use-cases/product-use-cases.service';
import { ProductEntity } from 'src/infrastructure/database/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: ProductTypeOrmRepository,
    },
    {
      provide: 'ProductService',
      useClass: ProductUseCase,
    },
    ProductUseCase, // Asegúrate de que el caso de uso está aquí
  ],
})
export class ProductModule {}
