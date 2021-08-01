import { GoogleUserFunction } from '../module/google-user/google-user.function';
import { MailReceptFunction } from '../module/mail-recept/mail-user.function';
import { jobType } from '../module/jobs/jobs.constant';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { GoogleUserEntity } from '../module/google-user/google-user.entity';
import { JobsEntity } from '../module/jobs/jobs.entity';
import { Repository } from 'typeorm';
import {
  googleInit,
  googleRegisterAccountStepOne,
  googleRegisterAccountStepOneMobile,
} from '../services/google';
import { closePage, getBrowser, getCookie, goPage } from '../services/common';
import { goPost, reactPost } from '../services/google/post';
import { timeWaiting } from '../services/common/resolver';
import * as random from 'random-profile-generator';
import * as randomPassword from 'generate-password';
import * as moment from 'moment';
@Injectable()
export class GoogleCronService {
  private readonly logger = new Logger(GoogleCronService.name);
  constructor(
    private mailRecept: MailReceptFunction,
    private googleUser: GoogleUserFunction,
    @InjectRepository(JobsEntity)
    private jobsRepository: Repository<JobsEntity>,
    @InjectRepository(GoogleUserEntity)
    private googleUsersRepository: Repository<GoogleUserEntity>,
  ) {}
  // public async GoogleReactJobs() {
  //   try {
  //     const jobReact = await this.jobsRepository.findOne({
  //       job_type: jobType.googleReact,
  //       status: false,
  //     });
  //     if (!jobReact) {
  //       console.log('WAITING REACT JOB');
  //       return;
  //     } else {
  //       console.log('Run Google Reaction Post');
  //     }
  //     const userGoogle = await this.GoogleUsersRepository.find({
  //       status: true,
  //     });
  //     userGoogle.map(async (user) => {
  //       let fPage = await goPage('https://en-gb.Google.com/', user.cookie);
  //       try {
  //         if (!user.cookie)
  //           fPage = (
  //             await GoogleInit(
  //               fPage,
  //               user.username,
  //               user.password,
  //               user.cookie,
  //             )
  //           ).page;
  //         await goPost(fPage, jobReact.job_data.post_link);
  //         await reactPost(fPage, GoogleReacts.haha);
  //         await this.jobsRepository.update(jobReact.id, {
  //           status: true,
  //         });
  //       } catch (e) {
  //         console.log('ERROR Google PAGE IN REACTION JOBS');
  //       } finally {
  //         await closePage(fPage);
  //       }
  //     });
  //   } catch (e) {
  //     console.log('ERROR REACT Google CRON???');
  //   }
  // }
  public async googleCreateAccountJobs() {
    try {
      const jobCreateAccountGoogle = await this.jobsRepository.findOne({
        job_type: jobType.googleCreateAccount,
        status: false,
      });
      if (!jobCreateAccountGoogle) {
        console.log(
          '================WAITING CREATE GOOGLE ACCOUNT JOB================',
        );
        // return;
      } else {
        console.log('Run Google Create Account Mobile');
      }

      const browser = await getBrowser(jobCreateAccountGoogle.proxy);
      let fPage = await goPage({
        url: 'https://accounts.google.com/signin/v2',
        browser,
        cookie: undefined,
      });
      try {
        const email = await this.mailRecept.addRandomMailRecept('TempMail');
        const profile = random.profile();
        const password = randomPassword.generate({
          length: 20,
          numbers: true,
          symbols: true,
        });
        const resultStepOne = await googleRegisterAccountStepOneMobile({
          fPage,
          firstName: random.firstName,
          lastName: random.lastName,
          email,
          phone: null,
          password,
          dateOfBirth: moment(profile.birthday, 'MMM Do[,] YYYY').unix(),
          gender: profile.gender.toLowerCase(),
        });
        await timeWaiting(30000);
        const GoogleMailCode = /(FB-)(\d+)/.exec(
          await this.mailRecept.readMailReceiptByTempMail(email),
        )[2];
        const cookie = (await getCookie(fPage)).toString();
        // register success
        await this.googleUser.validateGoogleUser(email, password);
        await this.googleUser.addAccountUser(email, password, cookie);
        console.log('Create Account Success');
      } catch (e) {
        console.log('Error Create New Google Account');
        throw 'Error Create New Google Account';
      } finally {
        closePage(fPage);
      }
      // }
    } catch (e) {
      console.log(e);
      console.log('ERROR REACT Google CRON???');
    }
  }
}
