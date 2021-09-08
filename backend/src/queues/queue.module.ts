import { MovieSearchQueueService } from './movie-search.queue.service';
import { JobsModule } from '../module/jobs/jobs.module';
import { Module } from '@nestjs/common';
import { MovieDetailQueueService } from './movie-detail.queue.service';

@Module({
  imports: [JobsModule],
  providers: [MovieDetailQueueService, MovieSearchQueueService],
})
export class QueueModule {}
