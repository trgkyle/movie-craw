import { JobsEntity } from './jobs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsFunction {
  constructor(
    @InjectRepository(JobsEntity)
    private jobsRepository: Repository<JobsEntity>,
  ) {}
  // private async checkUserExist(username, password): Promise<Boolean> {
  //   const result = await this.usersRepository.findOne({ username, password });
  //   console.log({ result });
  //   if (result) return true;
  //   return false;
  // }
  public async addJob(type, data): Promise<any> {
    try {
      const newJob = new JobsEntity();
      newJob.job_type = type;
      newJob.job_data = data;
      newJob.status = false;
      await this.jobsRepository.save(newJob);
    } catch (e) {
      return false;
    }
  }
  public async deleteJobs({id}): Promise<any> {
    try {
      await this.jobsRepository.delete(id);
    } catch (e) {
      throw "Cannot delete job";
    }
  }
  public async getAllJobs(): Promise<any> {
    const data = await this.jobsRepository.find({});
    return data;
  }
}
