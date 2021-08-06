import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CategoryResult {
  @Field((type) => String)
  name: String;
  @Field((type) => String)
  type: String;
  @Field((type) => [CategoryLink], { nullable: true })
  categoryLinks: CategoryLink[];
}

@ObjectType()
export class CategoryLink {
  @Field((type) => String)
  provider: string;
  @Field((type) => String)
  link: String;
}