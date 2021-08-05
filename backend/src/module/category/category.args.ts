import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetCategoryArgs {
  @Field({ nullable: true })
  name?: string;
}