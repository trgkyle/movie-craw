import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserLoginResult {
  @Field(type => String)
  token: String;
}

@ObjectType()
export class UserRegisterResult {
  @Field(type => String)
  email: string;
  @Field(type=> Boolean)
  status: Boolean
}

@ObjectType()
export class UserInfoResult {
  @Field(type => String)
  email: String
}