import {
  Resolver,
  Query,
  Args,
} from '@nestjs/graphql';
import { CategoryFunction } from './category.function';
import { GetCategoryArgs } from './category.args';

@Resolver()
export class CategoryResolver {
  constructor(
    private categoryService: CategoryFunction,
  ) {}
}
