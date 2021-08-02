import { jobType } from './../module/jobs/jobs.constant';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobsEntity } from '../module/jobs/jobs.entity';
import { Repository } from 'typeorm';
import { closePage, getBrowser, goPage } from '../services/common';
import { getCategories, getFirmLinkDetail, getVideoLink, startWatchFirm } from 'src/services/phimmoi';

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
          // const categoresLinks = (await getCategories(phimmoiPage)).href;
          // categoresLinks.map(() => {
          // });
          // console.log(categoresLinks);
          // phimmoiPage.goto(categoresLinks[0]);
          // await phimmoiPage.goto('https://phimmoii.org/danh-sach/phim-chieu-rap.html');
          // const firmLinks = (await getFirmLinkDetail(phimmoiPage)).href;
          // firmLinks.map(()=> {
            
          // });
          // console.log(firmLinks);
          // await phimmoiPage.goto('https://phimmoii.org/13349-qua-nhanh-qua-nguy-hiem-9.html');
          // await startWatchFirm(phimmoiPage);
          await phimmoiPage.goto('https://phimmoii.org/watch/13436.59764-tham-phan-ac-ma-tap-1.html');
          const firmSrc = await getVideoLink(phimmoiPage);
          console.log(firmSrc.src);
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
