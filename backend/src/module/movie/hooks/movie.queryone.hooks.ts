import { ModuleRef } from '@nestjs/core';
import { MovieFunction } from '../movie.function';
import { Injectable } from '@nestjs/common';
import { BeforeFindOneHook } from '@nestjs-query/query-graphql';

@Injectable()
export class MovieQueryOneHooks<Movie> implements BeforeFindOneHook<any> {
  private movieFunction: MovieFunction;
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit() {
    this.movieFunction = this.moduleRef.get(MovieFunction, { strict: false });
  }
  async run(instance, context): Promise<any> {
    try {
      const movieId = instance.id;
      this.movieFunction.addMovieCrawl(null,movieId);
    } catch (error) {}
    return instance;
    return instance;
  }
}
