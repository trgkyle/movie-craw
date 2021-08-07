import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { UserFunction } from './user.function';
import {
  UserRegisterResult,
  UserLoginResult,
  UserInfoResult,
} from './user.schema';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { AuthenService } from '../authen/authen.service';
import { CurrentUser, GqlAuthGuard } from '../authen/gql-auth.guard';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserFunction,
    private authenService: AuthenService,
  ) {}

  @Mutation((returns) => UserRegisterResult)
  async register(
    @Args({ name: 'email', type: () => String }) email: String,
    @Args({ name: 'password', type: () => String }) password: String,
  ) {
    try {
      await this.userService.registerUser(email, password);
      return { email, status: true };
    } catch (e) {
      throw e;
    }
  }

  @Mutation((returns) => UserLoginResult)
  async login(
    @Args({ name: 'email', type: () => String }) email: String,
    @Args({ name: 'password', type: () => String }) password: String,
  ) {
    try {
      const token = this.authenService.loginUser(email, password);
      return {
        token: (await token).access_token,
      };
    } catch (e) {
      throw e;
    }
  }
}
