import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetMovieArgs {
  @Field({ nullable: true })
  name?: string;
}