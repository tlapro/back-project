import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class AppSeederService implements OnModuleInit {
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
  ) {}

  async onModuleInit() {
    await this.categoriesService.preloadCategories();
    await this.productsService.preloadProducts();
  }
}
