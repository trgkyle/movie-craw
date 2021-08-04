import {
  Resolver,
  Query,
  Args,
} from '@nestjs/graphql';
import { MovieFunction } from './movie.function';
import {
  MovieInfoResult,
} from './movie.schema';
import { GetMovieArgs } from './movie.args';

@Resolver()
export class MovieResolver {
  constructor(
    private movieService: MovieFunction,
  ) {}

  @Query((returns) => [MovieInfoResult])
  async getMovieList(@Args() args: GetMovieArgs) {
    try {
      const movieList = await this.movieService.getMovie();
      return movieList;
    } catch (e) {
      throw e;
    }
  }
}
