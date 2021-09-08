import { CategoryModule } from './../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { Movie, MoviePart, MovieServer, MovieLink } from './movie.schema';
import { MovieResolver } from './movie.resolver';
import {
  MovieEntity,
  MovieLinkEntity,
  MoviePartEntity,
  MovieServerEntity,
} from './movie.entity';
import { MovieFunction } from './movie.function';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

@Module({
  providers: [MovieResolver, MovieFunction],
  imports: [
    forwardRef(()=>CategoryModule),
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
      dtos: [{ DTOClass: Movie }],
      resolvers: [
        {
          DTOClass: Movie,
          EntityClass: MovieEntity,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          DTOClass: MoviePart,
          EntityClass: MoviePartEntity,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          DTOClass: MovieServer,
          EntityClass: MovieServerEntity,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          DTOClass: MovieLink,
          EntityClass: MovieLinkEntity,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
      ],
    }),
  ],
  exports: [
    MovieResolver,
    MovieFunction,
    TypeOrmModule.forFeature([MovieEntity]),
  ],
})
export class MovieModule {}
