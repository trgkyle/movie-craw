import { CategoryResolver } from './category.resolver';
import { CategoryEntity, CategoryLinkEntity } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoryFunction } from './category.function';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]),TypeOrmModule.forFeature([CategoryLinkEntity])],
  providers: [CategoryResolver, CategoryFunction],
  exports: [
    CategoryResolver,
    CategoryFunction,
    TypeOrmModule.forFeature([CategoryEntity]),
  ],
})
export class CategoryModule {
}
