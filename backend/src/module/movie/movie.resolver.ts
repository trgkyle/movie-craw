import { Movie } from './movie.schema';
import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { MovieEntity } from './movie.entity';
@Resolver(() => Movie)
export class MovieResolver extends CRUDResolver(Movie, {
}) {
  constructor(
    @InjectQueryService(MovieEntity)
    readonly service: QueryService<MovieEntity>,
  ) {
    super(service);
  }
}
