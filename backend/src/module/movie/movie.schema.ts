import { IDField, Relation } from '@nestjs-query/query-graphql';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from '../category/category.schema';

@ObjectType()
@Relation('movieParts', () => MoviePart, { disableRemove: true })
@Relation('categories', () => Category, { disableRemove: true })
export class Movie {
  @IDField((type) => Int)
  id: number;
  @Field((type) => String)
  name: String;
  @Field((type) => String)
  description: String;
  @Field((type) => String)
  poster: String;
  // @Field((type) => [MoviePart], { nullable: true })
  // movieParts: MoviePart[];
}

@ObjectType()
@Relation('movieServers', () => MovieServer, { disableRemove: true })
export class MoviePart {
  @IDField((type) => Int)
  id: number;
  @Field((type) => String)
  type: string;
  @Field((type) => String)
  part: string;
  // @Field((type) => [MovieServer], { nullable: true })
  // movieServers: MovieServer[];
}

@ObjectType()
@Relation('movieLinks', () => MovieLink, { disableRemove: true })
export class MovieServer {
  @IDField((type) => Int)
  id: number;
  @Field((type) => String)
  provider: string;
  // @Field((type) => [MovieLink], { nullable: true })
  // movieLinks: MovieLink[];
}

@ObjectType()
export class MovieLink {
  @IDField((type) => Int)
  id: number;
  @Field((type) => String)
  name: string;
  @Field((type) => String)
  videoLink: string;
}
