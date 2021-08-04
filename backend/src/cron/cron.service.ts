import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { JobsFunction } from '../module/jobs/jobs.function';
// import { facebookService } from '../services/facebook';

@Injectable()
export class CronService {
  constructor(private jobCronFucntion: JobsFunction) {}
  private readonly logger = new Logger(CronService.name);

  @Timeout(0)
  async handleRunJobListAfter() {
    this.logger.debug('Called when the current second is 10');
    try {
      await this.jobCronFucntion.checkAndRunsJob();
    } catch (e) {
      console.log('Error in handle facebook reaction post');
    }
  }
  @Cron('*/10 * * * * *')
  async handleRunJobList() {
    this.logger.debug('Called when the current second is 10');
    try {
      await this.jobCronFucntion.checkAndRunsJob();
    } catch (e) {
      console.log('Error in handle facebook reaction post');
    }
  }
}
