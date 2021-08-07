import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FilterableField, IDField, Relation } from '@nestjs-query/query-graphql';

@ObjectType()
@Relation('categoryLinks', () => CategoryLink, { disableRemove: true })
export class Category {
  @IDField((type) => String)
  id: String;
  @FilterableField((type) => String)
  name: String;
  @Field((type) => String)
  type: String;
}

@ObjectType()
export class CategoryLink {
  @IDField((type) => String)
  id: String;
  @Field((type) => String)
  provider: string;
  @Field((type) => String)
  link: String;
}