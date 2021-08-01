import { JobsModule } from './../module/jobs/jobs.module';
import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { PhimmoiScronService } from './phimmoi.service';

@Module({
  imports: [JobsModule],
  providers: [CronService, PhimmoiScronService],
})
export class CronModule {}
