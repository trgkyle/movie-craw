import { Injectable, Logger } from '@nestjs/common';
import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';
import { JobsFunction } from '../module/jobs/jobs.function';
// import { facebookService } from '../services/facebook';

@Injectable()
@Processor('movie-queue')
export class MovieSearchQueueService {
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
  @Process('crawl-movie-name')
  async transcode(job: Job<unknown>) {
    console.log("Run queue");
    return {};
  }
}