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
    @InjectRepository(Category) // 💡 Inyectamos directamente el repositorio de categorías
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

      if (exists) continue;

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

  async getProducts() {
    return this.productsRepository.find({
      relations: ['category'],
    });
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new Error('El producto no fue encontrado');
    return product;
  }

  async saveProduct(product: Product) {
    return this.productsRepository.save(product);
  }

  async putImage(imgUrl: string, id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    product.imgUrl = imgUrl;
    await this.productsRepository.save(product);
  }
}
