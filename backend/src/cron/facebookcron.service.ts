import { FacebookUserFunction } from './../module/facebook-user/facebook-user.function';
import { MailReceptFunction } from './../module/mail-recept/mail-user.function';
import { jobType } from './../module/jobs/jobs.constant';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { FacebookUserEntity } from '../module/facebook-user/facebook-user.entity';
import { JobsEntity } from '../module/jobs/jobs.entity';
import { Repository } from 'typeorm';
import {
  facebookInit,
  facebookRegisterAccountStepOne,
  facebookRegisterAccountStepOneMobile,
} from '../services/facebook';
import {
  closeBrowser,
  closePage,
  getBrowser,
  getCookie,
  goPage,
} from '../services/common';
import { goPost, reactPost } from '../services/facebook/post';
import { facebookReacts, timeWaiting } from '../services/common/resolver';
import * as randomPassword from 'generate-password';
import * as random from 'random-profile-generator';
import {
  verifyCodeRegisterFacebookAccount,
  verifyCodeRegisterFacebookAccountMobile,
} from 'src/services/facebook/registerFollow';
import * as moment from 'moment';

@Injectable()
export class FacebookCronService {
  private readonly logger = new Logger(FacebookCronService.name);
  constructor(
    private mailRecept: MailReceptFunction,
    private facebookUser: FacebookUserFunction,
    @InjectRepository(JobsEntity)
    private jobsRepository: Repository<JobsEntity>,
    @InjectRepository(FacebookUserEntity)
    private facebookUsersRepository: Repository<FacebookUserEntity>,
  ) {}
  public async facebookReactJobs() {
    try {
      const jobReact = await this.jobsRepository.findOne({
        job_type: jobType.facebookReact,
        status: false,
      });
      if (!jobReact) {
        console.log('WAITING REACT JOB');
        return;
      } else {
        console.log('Run facebook Reaction Post');
      }
      const userFacebook = await this.facebookUsersRepository.find({
        status: true,
      });
      const browser = await getBrowser(jobReact.proxy);
      userFacebook.map(async (user) => {
        let fPage = await goPage({
          url: 'https://en-gb.facebook.com/',
          cookie: user.cookie,
          browser,
        });
        try {
          if (!user.cookie)
            fPage = (
              await facebookInit(
                fPage,
                user.username,
                user.password,
                user.cookie,
              )
            ).page;
          await goPost(fPage, jobReact.job_data.post_link);
          await reactPost(fPage, facebookReacts.haha);
          await this.jobsRepository.update(jobReact.id, {
            status: true,
          });
        } catch (e) {
          console.log('ERROR FACEBOOK PAGE IN REACTION JOBS');
        } finally {
          await closePage(fPage);
        }
      });
    } catch (e) {
      console.log('ERROR REACT FACEBOOK CRON???');
    }
  }
  public async facebookCreateAccountJobs() {
    const jobCreateFacebook = await this.jobsRepository.findOne({
      job_type: jobType.facebookCreateAccount,
      status: false,
    });
    if (!jobCreateFacebook) {
      console.log('WAITING CREATE FACEBOOK ACCOUNT JOB');
      return;
    } else {
      console.log('Run facebook Create Account Post');
    }
    const browser = await getBrowser(jobCreateFacebook.proxy);
    const numberAccount = jobCreateFacebook.job_data.numberAccount;
    try {
      for (let i = 0; i < +numberAccount; i++) {
        let fPage = await goPage({
          url: 'https://en-gb.facebook.com/',
          cookie: undefined,
          browser,
        });
        try {
          const email = await this.mailRecept.addRandomMailRecept('TempMail');
          const profile = random.profile();
          console.log(profile.birthday);
          const resultStepOne = await facebookRegisterAccountStepOne({
            fPage,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email,
            phone: null,
            password: randomPassword.generate({
              length: 10,
              numbers: true,
            }),
            dateOfBirth: moment(profile.birthday, 'MMM Do[,] YYYY').unix(),
            gender: profile.gender.toLowerCase(),
          });
          await timeWaiting(5000);
          const facebookMailCode = /(FB-)(\d+)/.exec(
            await this.mailRecept.readMailReceiptByTempMail(email),
          )[2];
          console.log(facebookMailCode);
          const resultStepTwo = await verifyCodeRegisterFacebookAccount({
            fPage,
            code: facebookMailCode,
          });
        } catch (e) {
          console.log(e);
          console.log('Error Create New Facebook Account');
          throw 'Error Create New Facebook Account';
        } finally {
          closePage(fPage);
        }
      }
    } catch (e) {
      console.log('ERROR CREATE FACEBOOK ACCOUNT DESKTOP CRON???');
    } finally {
      await closeBrowser(browser);
    }
  }

  public async facebookCreateAccountMobileJobs() {
    const jobCreateAccountMobile = await this.jobsRepository.findOne({
      job_type: jobType.facebookCreateAccount,
      status: false,
    });
    if (!jobCreateAccountMobile) {
      console.log(
        '================WAITING CREATE FACEBOOK ACCOUNT MOBILE JOB================',
      );
      return;
    } else {
      console.log('Run facebook Create Account Mobile');
    }
    const browser = await getBrowser(jobCreateAccountMobile.proxy);
    const numberAccount = jobCreateAccountMobile.job_data.numberAccount;
    try {
      for (let i = 0; i < +numberAccount; i++) {
        let fPage = await goPage({
          url: 'https://m.facebook.com/',
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
          const resultStepOne = await facebookRegisterAccountStepOneMobile({
            fPage,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email,
            phone: null,
            password: randomPassword.generate({
              length: 10,
              numbers: true,
            }),
            dateOfBirth: moment(profile.birthday, 'MMM Do[,] YYYY').unix(),
            gender: profile.gender.toLowerCase(),
          });
          await timeWaiting(30000);
          const facebookMailCode = /(FB-)(\d+)/.exec(
            await this.mailRecept.readMailReceiptByTempMail(email),
          )[2];
          const resultStepTwo = await verifyCodeRegisterFacebookAccountMobile({
            fPage,
            code: facebookMailCode,
          });
          const cookie = (await getCookie(fPage)).toString();
          // register success
          await this.facebookUser.validateFacebookUser(email, password);
          await this.facebookUser.addAccountUser(email, password, cookie);
          console.log('Create Account Success');
        } catch (e) {
          console.log('Error Create New Facebook Account');
          throw 'Error Create New Facebook Account';
        } finally {
          closePage(fPage);
        }
      }
    } catch (e) {
      console.log('ERROR CREATE FACEBOOK ACCOUNT MOBILE CRON???');
    } finally {
      await closeBrowser(browser);
    }
  }
}
