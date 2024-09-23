import { Injectable, Inject } from '@nestjs/common';
import { GetProductsPort } from 'src/application/repositories/get-products.interface';
import { IProductRepository } from 'src/domain/repositories/product/product-repository.interface';
import { Product } from 'src/domain/entities/product/product.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/presentation/dtos/pagination.dto';

@Injectable()
export class GetProductsUseCase implements GetProductsPort {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(pageOptionsDto: PageOptionsDto): Promise<PageDto<Product>> {
    const response = await this.productRepository.findAll(pageOptionsDto.page, pageOptionsDto.limit);
    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount: 0 });
    return new PageDto(response, pageMetaDto);
  }
}
