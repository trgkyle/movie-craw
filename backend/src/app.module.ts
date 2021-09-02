import { CategoryModule } from './module/category/category.module';
import { JobsModule } from './module/jobs/jobs.module';
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
import { MovieModule } from './module/movie/movie.module';

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
    // UserModule,
    // AuthenModule,
    CronModule,
    JobsModule,
    MovieModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
