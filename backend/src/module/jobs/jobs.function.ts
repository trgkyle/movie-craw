import { JobsEntity } from './jobs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { JOB_TYPE } from './jobs.constant';
import { MovieFunction } from '../movie/movie.function';
import { PhimmoiService } from '../../services/phimmoi/phimmoi.service';

@Injectable()
export class JobsFunction {
  constructor(
    @InjectRepository(JobsEntity)
    private jobsRepository: Repository<JobsEntity>,
    private movieFunction: MovieFunction,
    private phimmoiService: PhimmoiService,
  ) {}
  private isRunJob: Boolean
  public async checkAndRunsJob() {
    if(this.isRunJob) return;
    this.isRunJob = true;
    const jobs = await this.jobsRepository.find({ status: true });
    console.log(jobs);
    for (const job of jobs) {
      job.status = true;
      await this.jobsRepository.save(job);
      const jobType = job.job_type;

      // Run job
      switch (jobType) {
        case JOB_TYPE.phimmoiFirmList:
          const categoriesLink = await this.phimmoiService.getPhimmoiCategoires();
          const linkFirmByCategoriesGroup = [];
          await Promise.all(categoriesLink.map(async (category) => {
            console.log(category);
            const firmList = await this.phimmoiService.getPhimmoiFirmListLinkByCategories(category);
            linkFirmByCategoriesGroup.push({ category, firmList });
          }));
          console.log(linkFirmByCategoriesGroup);
          console.log("DO FIRM PHIMMOI CRAWL");
          break;
      } 
    }
    this.isRunJob = false;
  }
  public async addJob(type): Promise<any> {
    try {
      const newJob = new JobsEntity();
      newJob.job_type = type;
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
    const data = await this.jobsRepository.find();
    return data;
  }
}
