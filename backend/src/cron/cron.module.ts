import { JobsModule } from './../module/jobs/jobs.module';
import { Module } from '@nestjs/common';
import { CronService } from './cron.service';

@Module({
  imports: [JobsModule],
  providers: [CronService],
})
export class CronModule {}
