import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { MovieResolver } from './movie.resolver';
import {
  MovieEntity,
  MovieLinkEntity,
  MoviePartEntity,
  MovieServerEntity,
} from './movie.entity';
import { MovieFunction } from './movie.function';

import { Movie, MovieLink, MoviePart, MovieServer } from './movie.schema';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forFeature([MovieEntity]),
    TypeOrmModule.forFeature([MoviePartEntity]),
    TypeOrmModule.forFeature([MovieServerEntity]),
    TypeOrmModule.forFeature([MovieLinkEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([MovieEntity]),
        NestjsQueryTypeOrmModule.forFeature([MoviePartEntity]),
        NestjsQueryTypeOrmModule.forFeature([MovieServerEntity]),
        NestjsQueryTypeOrmModule.forFeature([MovieLinkEntity]),
      ],
      resolvers: [
        { DTOClass: Movie, EntityClass: MovieEntity },
        { DTOClass: MoviePart, EntityClass: MoviePartEntity },
        { DTOClass: MovieServer, EntityClass: MovieServerEntity },
        { DTOClass: MovieLink, EntityClass: MovieLinkEntity },
      ],
    }),
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
