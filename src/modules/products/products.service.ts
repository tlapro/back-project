import { Injectable } from '@nestjs/common';
import { IProduct, ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProductById(id: number) {
    return this.productsRepository.getProductById(id);
  }

  createProduct(user: Omit<IProduct, 'id'>) {
    return this.productsRepository.createProduct(user);
  }

  putFunction(id: number) {
    return this.productsRepository.putFunction(id);
  }

  deleteProduct(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
