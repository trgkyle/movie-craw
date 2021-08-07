import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FilterableField, FilterableUnPagedRelation, IDField } from '@nestjs-query/query-graphql';
import { Movie } from '../movie/movie.schema';

@ObjectType()
@FilterableUnPagedRelation('categoryLinks', () => CategoryLink, { disableRemove: true })
@FilterableUnPagedRelation('movies', () => Movie, { disableRemove: true })
export class Category {
  @IDField((type) => Int)
  id: number;
  @FilterableField((type) => String)
  name: String;
  @FilterableField((type) => String)
  type: String;
}

@ObjectType()
export class CategoryLink {
  @IDField((type) => String)
  id: number;
  @FilterableField((type) => String)
  provider: string;
  @FilterableField((type) => String)
  link: String;
}