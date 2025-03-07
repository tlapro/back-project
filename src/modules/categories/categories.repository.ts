import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return this.categoriesRepository.find();
  }

  async addCategories(categories: Category[]): Promise<void> {
    for (const category of categories) {
      const exists = await this.categoriesRepository.findOne({
        where: { name: category.name },
      });
      if (!exists) {
        console.log(
          `Cargando en la base de datos la categoría: ${category.name}`,
        );
        await this.categoriesRepository.save(category);
      }
    }
  }
}
