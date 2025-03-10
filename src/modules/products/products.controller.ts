import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
}

// @Post()
// createProduct(user: IProduct) {
//   return this.productsService.createProduct(user);
// }
// @Post('seeder')
// preloadProducts(){
//   return this.productsService.preloadProduct();
// }
// @Put(':id')
// @UseGuards(AuthGuard)
// putFunction(@Param('id') id: string) {
//   return this.productsService.putFunction(Number(id));
// }

// @Delete('id')
// @UseGuards(AuthGuard)
// deleteProduct(@Param('id') id: string) {
//   return this.productsService.deleteProduct(Number(id));
// }
// }
