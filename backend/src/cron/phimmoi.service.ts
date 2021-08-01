import { jobType } from './../module/jobs/jobs.constant';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobsEntity } from '../module/jobs/jobs.entity';
import { Repository } from 'typeorm';
import { closePage, getBrowser, goPage } from '../services/common';

@Injectable()
export class PhimmoiScronService {
  private readonly logger = new Logger(PhimmoiScronService.name);
  constructor(
    @InjectRepository(JobsEntity)
    private jobsRepository: Repository<JobsEntity>,
  ) {}
  public async phimmoiCrawFirmList() {
    try {
      //   const jobReact = await this.jobsRepository.findOne({
      //     job_type: jobType.facebookReact,
      //     status: false,
      //   });
      //   if (!jobReact) {
      //     this.logger.log('WAITING Phimmoi job');
      //     return;
      //   }
      const browser = await getBrowser();
      let phimmoiPage = await goPage({
        url: 'https://phimmoii.org/',
        cookie: undefined,
        browser,
      });
      try {
        //   await goPage(
      } catch (e) {
        this.logger.log('ERROR FACEBOOK PAGE IN REACTION JOBS');
      } finally {
        // await closePage(phimmoiPage);
      }
    } catch (e) {
      this.logger.log('ERROR REACT FACEBOOK CRON???');
    }
  }
}
