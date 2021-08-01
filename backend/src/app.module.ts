import { MailReceptModule } from './module/mail-recept/mail-user.module';
import { ProxyModule } from './module/proxy/proxy.module';
import { JobsModule } from './module/jobs/jobs.module';
import { FacebookUserModule } from './module/facebook-user/facebook-user.module';
import { AuthenModule } from './module/authen/authen.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './module/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      // host: 'localhost',
      // port: 27017,
      // username: 'root',
      // password: '',
      // database: 'seoupto',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthenModule,
    FacebookUserModule,
    ProxyModule,
    CronModule,
    JobsModule,
    MailReceptModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
