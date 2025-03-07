import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { products } from 'src/helpers/products';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async preloadProducts() {
    console.log('Seeding products...');
    await this.productsRepository.addProducts(products);
    console.log('Products seeded!');
  }
}

// getProducts() {
//   return this.productsRepository.getProducts();
// }

// getProductById(id: number) {
//   return this.productsRepository.getProductById(id);
// }

// createProduct(user: Omit<IProduct, 'id'>) {
//   return this.productsRepository.createProduct(user);
// }

// putFunction(id: number) {
//   return this.productsRepository.putFunction(id);
// }

// deleteProduct(id: number) {
//   return this.productsRepository.deleteProduct(id);
// }
// }
