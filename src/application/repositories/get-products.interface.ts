import { Product } from 'src/domain/entities/product/product.entity';
import { PageDto, PageOptionsDto } from 'src/presentation/dtos/pagination.dto';

export interface GetProductsPort {
  execute(pageOptionsDto: PageOptionsDto): Promise<PageDto<Product>>;
}
