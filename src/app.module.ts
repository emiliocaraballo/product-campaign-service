import { Module } from '@nestjs/common';
import { ProductModule } from 'src/presentation/modules/product.module';
import { DatabaseModule } from 'src/infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule, ProductModule],
})
export class AppModule {}
