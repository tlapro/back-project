import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async addProducts(
    products: {
      name: string;
      description: string;
      price: number;
      stock: number;
      category: string;
    }[],
  ) {
    for (const productData of products) {
      const exists = await this.productsRepository.findOne({
        where: { name: productData.name },
      });

      if (!exists) {
        const category = await this.categoriesRepository.findOne({
          where: { name: productData.category },
        });

        if (!category) {
          console.warn(`⚠️ Categoría '${productData.category}' no encontrada`);
          continue;
        }
        console.log(
          `Cargando en la base de datos el producto: ${productData.name}`,
        );
        const product = this.productsRepository.create({
          ...productData,
          category,
        });
        await this.productsRepository.save(product);
      }
    }
  }

  async getProducts() {
    return this.productsRepository.find({
      relations: ['category'], // Esto incluye la categoría asociada en cada producto
    });
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw Error('El producto no fue encontrado');
    }
    return product;
  }

  async saveProduct(product: Product) {
    return this.productsRepository.save(product);
  }
}
// getProductById(id: number) {
//   return this.products.find((product) => product.id === id);
// }

// createProduct(product: Omit<IProduct, 'id'>) {
//   const id = this.products.length + 1;
//   const newProduct = { id, ...product };
//   this.products = [...this.products, newProduct];
//   return newProduct;
// }

// putFunction(id) {
//   const product = this.products.find((product) => product.id === id);
//   return ['Logica del put para modificar este producto: ', product];
// }

// deleteProduct(id: number) {
//   const product = this.products.find((product) => product.id === id);
//   return ['Logica del delete para eliminar este producto: ', product];
// }
