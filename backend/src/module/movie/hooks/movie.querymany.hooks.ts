import { MovieFunction } from '../movie.function';
import { StringFieldComparisons } from '@nestjs-query/core';
import { Movie } from '../movie.schema';
import { Injectable } from '@nestjs/common';
import { BeforeCreateOneHook, BeforeQueryManyHook, CreateOneInputType,} from '@nestjs-query/query-graphql';
import { GqlContextType } from '@nestjs/graphql';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class MovieQueryManyHooks<Movie> implements BeforeQueryManyHook<any> {
  private movieFunction: MovieFunction;
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit() {
    this.movieFunction = this.moduleRef.get(MovieFunction, { strict: false });
  }
  async run(instance, context): Promise<any> {
    try {
        const filter:any = instance.filter;
        const nameFilter:StringFieldComparisons = filter.name;
        this.movieFunction.addMovieCrawl(nameFilter, null);
    } catch (error) {
    }
    return instance;
  }
}