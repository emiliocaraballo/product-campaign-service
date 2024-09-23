import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/infrastructure/database/database.module';

import { ProductModule } from 'src/presentation/modules/product.module';
import { CartModule } from 'src/presentation/modules/cart.module';

@Module({
  imports: [DatabaseModule, ProductModule, CartModule],
})
export class AppModule {}
