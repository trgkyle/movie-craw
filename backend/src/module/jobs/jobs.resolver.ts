import {
  JobsRegisterResult,
  JobsListResult,
  JobsDeleteResult,
} from './jobs.schema';
import { JobsFunction } from './jobs.function';
import {
  Resolver,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql';
@Resolver()
export class JobsResolver {
  constructor(private jobsFunction: JobsFunction) {}

  @Mutation((returns) => JobsRegisterResult)
  async addJob(@Args({ name: 'name', type: () => String }) name: String) {
    try {
      await this.jobsFunction.addJob(name);
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

  @Query((returns) => [JobsListResult])
  async getJobs() {
    try {
      const jobsList = await this.jobsFunction.getAllJobs();
      return jobsList;
    } catch (e) {
      throw e;
    }
  }
}
