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
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Movie, MovieLink, MoviePart, MovieServer } from './movie.schema';

@Module({
  imports: [
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
