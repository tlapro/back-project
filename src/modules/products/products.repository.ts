/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

@Injectable()
export class ProductsRepository {
  private products: IProduct[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      image: 'https://picsum.photos/200/300',
      stock: 10,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Product 2 description',
      price: 200,
      image: 'https://picsum.photos/200/300',
      stock: 20,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Product 3 description',
      price: 300,
      image: 'https://picsum.photos/200/300',
      stock: 30,
    },
  ];

  async getProducts() {
    return this.products;
  }
}
