import { MovieQueryOneHooks } from './hooks/movie.queryone.hooks';
import { MovieQueryManyHooks } from './hooks/movie.querymany.hooks';
import { FilterableUnPagedRelation, IDField, Relation, FilterableField, BeforeQueryMany, BeforeFindOne, FindOneArgsType } from '@nestjs-query/query-graphql';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from '../category/category.schema';

@ObjectType()
@BeforeQueryMany(MovieQueryManyHooks)
@BeforeFindOne(MovieQueryOneHooks)
@FilterableUnPagedRelation('categories', () => Category, { disableRemove: true, disableUpdate: true })
@FilterableUnPagedRelation('movieParts', () => MoviePart, { disableRemove: true, disableUpdate: true })
export class Movie {
  @IDField((type) => Int)
  id: number;
  @FilterableField((type) => String)
  name: String;
  @Field((type) => String)
  description: String;
  @Field((type) => String)
  poster: String;
}

@ObjectType()
@FilterableUnPagedRelation('movieServers', () => MovieServer, { disableRemove: true })
export class MoviePart {
  @IDField((type) => Int)
  id: number;
  @FilterableField((type) => String)
  type: string;
  @FilterableField((type) => String)
  part: string;
}

@ObjectType()
@FilterableUnPagedRelation('movieLinks', () => MovieLink, { disableRemove: true })
export class MovieServer {
  @IDField((type) => Int)
  id: number;
  @FilterableField((type) => String)
  provider: string;
}

@ObjectType()
export class MovieLink {
  @IDField((type) => Int)
  id: number;
  @FilterableField((type) => String)
  name: string;
  @Field((type) => String)
  videoLink: string;
}
