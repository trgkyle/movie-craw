import { jobType, jobGroupData } from './jobs.constant';
import {
  JobsRegisterResult,
  JobsListResult,
  JobsDeleteResult,
} from './jobs.schema';
import { JobsFunction } from './jobs.function';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../authen/gql-auth.guard';
import { UserInfo } from '../common/user.type';

@Resolver()
export class JobsResolver {
  constructor(private jobsFunction: JobsFunction) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => JobsRegisterResult)
  async addFacebookReactJob(
    @Args({ name: 'post_link', type: () => String }) post_link: String,
  ) {
    try {
      await this.jobsFunction.addJob(
        jobType.facebookReact,
        jobGroupData({
          type: jobType.facebookReact,
          post_link,
          numberAccount: null,
        }),
      );
      return { status: true };
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => JobsRegisterResult)
  async createFacebookAccountJob(
    @Args({ name: 'numberAccount', type: () => Number }) numberAccount: Number,
  ) {
    try {
      await this.jobsFunction.addJob(
        jobType.facebookCreateAccount,
        jobGroupData({
          type: jobType.facebookCreateAccount,
          numberAccount,
          post_link: null,
        }),
      );
      return { status: true };
    } catch (e) {
      throw e;
    }
  }

  @Mutation((returns) => JobsDeleteResult)
  async deleteJob(@Args({ name: 'id', type: () => [String] }) id: [String]) {
    try {
      await this.jobsFunction.deleteJobs({ id });
      return { status: true };
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [JobsListResult])
  async jobs() {
    try {
      const jobsList = await this.jobsFunction.getAllJobs();
      return jobsList;
    } catch (e) {
      throw e;
    }
  }
}
