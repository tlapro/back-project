import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { categories } from 'src/helpers/categories';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async preloadCategories() {
    const categoryEntities = categories.map((name) => {
      const category = new Category();
      category.name = name;
      return category;
    });
    console.log('Seeding categories...');
    await this.categoriesRepository.addCategories(categoryEntities);
    console.log('Categories seeded!');
  }
}
