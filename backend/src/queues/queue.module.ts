import { JobsModule } from '../module/jobs/jobs.module';
import { Module } from '@nestjs/common';
import { MovieQueueService } from './movie.queue.service';

@Module({
  imports: [
    JobsModule,
  ],
  providers: [MovieQueueService],
})
export class QueueModule {}
