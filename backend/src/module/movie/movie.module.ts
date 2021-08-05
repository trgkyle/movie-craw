import { AuthenModule } from '../authen/authen.module';
import { MovieResolver } from './movie.resolver';
import {
  MovieEntity,
  MovieLinkEntity,
  MoviePartEntity,
  MovieServerEntity,
} from './movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovieFunction } from './movie.function';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
    TypeOrmModule.forFeature([MoviePartEntity]),
    TypeOrmModule.forFeature([MovieServerEntity]),
    TypeOrmModule.forFeature([MovieLinkEntity]),
  ],
  providers: [MovieResolver, MovieFunction],
  exports: [
    MovieResolver,
    MovieFunction,
    TypeOrmModule.forFeature([MovieEntity]),
    TypeOrmModule.forFeature([MoviePartEntity]),
    TypeOrmModule.forFeature([MovieServerEntity]),
    TypeOrmModule.forFeature([MovieLinkEntity]),
  ],
})
export class MovieModule {}
