import {
  Resolver,
  Query,
  Args,
} from '@nestjs/graphql';
import { CategoryFunction } from './category.function';
import {
  CategoryResult,
} from './category.schema';
import { GetCategoryArgs } from './category.args';

@Resolver()
export class CategoryResolver {
  constructor(
    private categoryService: CategoryFunction,
  ) {}

  @Query((returns) => [CategoryResult])
  async getCategoryList(@Args() args: GetCategoryArgs) {
    try {
      const categoryList = await this.categoryService.getAllCategories();
      return categoryList;
    } catch (e) {
      throw e;
    }
  }
}
