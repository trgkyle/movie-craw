import { CategoryResolver } from './category.resolver';
import { CategoryEntity, CategoryLinkEntity } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoryFunction } from './category.function';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Category } from './category.schema';
@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    TypeOrmModule.forFeature([CategoryLinkEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([CategoryEntity]),
      ],
      resolvers: [
        { DTOClass: Category, EntityClass: CategoryEntity },
      ],
    }),
  ],
  providers: [CategoryResolver, CategoryFunction],
  exports: [
    CategoryResolver,
    CategoryFunction,
    TypeOrmModule.forFeature([CategoryEntity]),
  ],
})
export class CategoryModule {}
