import { Inject } from '@nestjs/common';
import { GetProductsPort } from 'src/application/repositories/get-products.interface';
import { ProductRepository } from 'src/domain/repositories/product/product-repository.interface';
import { Product } from 'src/domain/entities/product/product.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/presentation/dtos/pagination.dto';

export class GetProductsUseCase implements GetProductsPort {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(pageOptionsDto: PageOptionsDto): Promise<PageDto<Product>> {
    const response = await this.productRepository.findAll(pageOptionsDto.page, pageOptionsDto.limit);
    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount: 0 });
    return new PageDto(response, pageMetaDto);
  }
}
