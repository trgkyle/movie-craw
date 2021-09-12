import { Injectable, Logger } from '@nestjs/common';
import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';
import { JobsFunction } from '../module/jobs/jobs.function';

@Injectable()
@Processor('movie-queue')
export class MovieQueueService {
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}...`,
    );
  }
  @Process('crawl-movie-name')
  async crawlMovieName(job: Job<unknown>) {
    console.log("Run queue", JSON.stringify(job.data));
    return {};
  }
}