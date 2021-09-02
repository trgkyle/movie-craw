import { CategoryEntity } from './category.entity';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Category } from './category.schema';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import {
  Resolver,
} from '@nestjs/graphql';

@Resolver()
export class CategoryResolver extends CRUDResolver(Category, {
}) {
  constructor(
    @InjectQueryService(CategoryEntity)
    readonly service: QueryService<CategoryEntity>,
  ) {
    super(service);
  }
}
