import { JobsLoginResult } from './jobs.schema';
import { JobsResolver } from './jobs.resolver';
import { AuthenModule } from '../authen/authen.module';
import { JobsEntity } from './jobs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JobsFunction } from './jobs.function';

@Module({
  imports: [TypeOrmModule.forFeature([JobsEntity])],
  providers: [
    JobsLoginResult,
    JobsFunction,
    JobsResolver,
  ],
  exports: [
    TypeOrmModule.forFeature([JobsEntity]),
    JobsLoginResult,
    JobsFunction,
    JobsResolver,
  ]
})
export class JobsModule {}
