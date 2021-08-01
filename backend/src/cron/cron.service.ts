import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { PhimmoiScronService } from './phimmoi.service';
// import { facebookService } from '../services/facebook';

@Injectable()
export class CronService {
  constructor(private phimmoiScronService: PhimmoiScronService) {}
  private readonly logger = new Logger(CronService.name);

  // @Cron('45 * * * * *')
  // async handleFacebookReaction() {
  //   this.logger.debug('Called when the current second is 45');
  //   try {
  //     await this.facebookCronService.facebookReactJobs();
  //   } catch (e) {
  //     console.log('Error in handle facebook reaction post');
  //   }
  // }

  @Timeout(0)
  // @Cron('*/37 * * * * *')
  async handlePhimmoiJob() {
    this.logger.debug('Phimmoi CRAWL JOBS ATTACHED');
    try {
      await Promise.all([
        this.phimmoiScronService.phimmoiCrawFirmList(),
        // this.facebookCronService.facebookCreateAccountMobileJobs(),
        // this.facebookCronService.facebookCreateAccountJobs(),
      ]);
    } catch (e) {
      console.log(e);
    }
  }
  // @Timeout(100)
  // // @Cron('10 * * * * *')
  // async handleCreateGoogleAccount() {
  //   this.logger.debug('GOOGLE CREATE ACCOUNT JOBS ATTACHED');
  //   try {
  //     await this.googleCronService.googleCreateAccountJobs();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // @Timeout(0)
  // async handleApplyProxy() {
  //   this.logger.debug('PROXY SET DEFAULT ATTACHED');
  //   try {
  //     await this.proxyCronService.setDefaultProxy();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}
