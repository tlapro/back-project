import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
  exports: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
