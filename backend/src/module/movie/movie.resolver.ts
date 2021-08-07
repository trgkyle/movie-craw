import {
  Resolver,
  Query,
  Args,
} from '@nestjs/graphql';
import { MovieFunction } from './movie.function';

@Resolver()
export class MovieResolver {
  constructor(
    private movieService: MovieFunction,
  ) {}
}
