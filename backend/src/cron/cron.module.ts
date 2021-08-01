import { GoogleUserModule } from './../module/google-user/google-user.module';
import { GoogleCronService } from './googlecron.service';
import { MailReceptModule } from './../module/mail-recept/mail-user.module';
import { ProxyModule } from './../module/proxy/proxy.module';
import { ProxyCronService } from './proxycron.service';
import { JobsModule } from './../module/jobs/jobs.module';
import { FacebookCronService } from './facebookcron.service';
import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { FacebookUserModule } from '../module/facebook-user/facebook-user.module';

@Module({
  imports: [JobsModule, FacebookUserModule, ProxyModule, MailReceptModule, GoogleUserModule],
  providers: [CronService, FacebookCronService, ProxyCronService, GoogleCronService],
})
export class CronModule {}
