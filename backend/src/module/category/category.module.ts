import { MovieModule } from './../movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { CategoryResolver } from './category.resolver';
import { CategoryEntity, CategoryLinkEntity } from './category.entity';
import { CategoryFunction } from './category.function';
import { Category, CategoryLink } from './category.schema';
@Module({
  imports: [
    forwardRef(() => MovieModule),
    TypeOrmModule.forFeature([CategoryEntity]),
    TypeOrmModule.forFeature([CategoryLinkEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([CategoryEntity]),
        NestjsQueryTypeOrmModule.forFeature([CategoryLinkEntity]),
      ],
      dtos: [{ DTOClass: Category }],
      resolvers: [
        {
          DTOClass: Category,
          EntityClass: CategoryEntity,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          DTOClass: CategoryLink,
          EntityClass: CategoryLinkEntity,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
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
