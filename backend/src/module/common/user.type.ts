import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class UserInfo {
  @Field(type => String)
  id: String

  @Field(type => String)
  email: String

  @Field(type => String)
  password: String
}