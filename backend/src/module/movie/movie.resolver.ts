import { Movie } from './movie.schema';
import { Resolver } from '@nestjs/graphql';
import { CRUDResolver, InjectPubSub } from '@nestjs-query/query-graphql';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { MovieEntity } from './movie.entity';
import { PubSub } from 'graphql-subscriptions';
@Resolver(() => Movie)
export class MovieResolver extends CRUDResolver(Movie, {
  create: { disabled: true },
  update: { disabled: true },
  delete: { disabled: true },
  enableSubscriptions: true,
}) {
  constructor(
    @InjectQueryService(MovieEntity)
    readonly service: QueryService<MovieEntity>,
    @InjectPubSub() readonly pubSub: PubSub
  ) {
    super(service);
  }
}
