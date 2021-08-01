import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class JobsLoginResult {
  @Field((type) => String)
  token: String;
}

@ObjectType()
export class JobsRegisterResult {
  @Field((type) => Boolean)
  status: Boolean;
}

@ObjectType()
export class JobsDeleteResult {
  @Field((type) => Boolean)
  status: Boolean;
}

@ObjectType()
export class JobsInfoResult {
  @Field((type) => String)
  email: String;
}

@ObjectType()
export class JobData {
  @Field((type) => String, { nullable: true})
  post_link: String;
  @Field((type) => Number, { nullable: true})
  numberAccount: Number;
  @Field((type) => Boolean)
  status: Boolean;
}
@ObjectType()
export class JobsListResult {
  @Field((type) => String)
  id: String;
  @Field((type) => String)
  job_type: String;
  @Field((type) => Boolean)
  status: Boolean;
  @Field((type) => JobData)
  job_data: JobData;
}
