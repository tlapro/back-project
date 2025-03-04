import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from './products.repository';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }

  @Post()
  createProduct(user: IProduct) {
    return this.productsService.createProduct(user);
  }

  @Put(':id')
  putFunction(@Param('id') id: string) {
    return this.productsService.putFunction(Number(id));
  }

  @Delete('id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(Number(id));
  }
}
