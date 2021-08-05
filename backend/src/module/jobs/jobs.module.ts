import { JobsLoginResult } from './jobs.schema';
import { JobsResolver } from './jobs.resolver';
import { AuthenModule } from '../authen/authen.module';
import { JobsEntity } from './jobs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JobsFunction } from './jobs.function';
import { MovieModule } from '../movie/movie.module';
import { PhimmoiService } from '../../services/phimmoi/phimmoi.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobsEntity]), MovieModule, CategoryModule],
  providers: [
    JobsLoginResult,
    JobsFunction,
    JobsResolver,
    PhimmoiService
  ],
  exports: [
    TypeOrmModule.forFeature([JobsEntity]),
    JobsLoginResult,
    JobsFunction,
    JobsResolver,
  ]
})
export class JobsModule {}
