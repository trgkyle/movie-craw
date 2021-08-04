import { MovieEntity } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MovieInfoResult } from './movie.schema';

/*
    - Movie
      + name (*)
      + description (*)
      + releaseDate
      + rating
      + poster (*)
      + trailer
      + actors
      + director
      + genre
      + duration
      - Movie part
        + type (*) (multi, single)
        + part (*) 1->N
        - Movie server
          + provider
          - Movie link
            + name
            + link
*/
@Injectable()
export class MovieFunction {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
  ) {}
  public async createNewMovie(name, description, poster): Promise<Boolean> {
    if (!(await this.checkMovieExist(name))) {
      const newMovie = new MovieEntity();
      newMovie.name = name;
      newMovie.description = description;
      newMovie.poster = poster;
      await this.movieRepository.save(newMovie);
      return true;
    }
    throw 'Đã tồn tại phim trong hệ thống';
  }
  public async checkMovieExist(name): Promise<any> {
    const movie = await this.movieRepository.find({ name });
    if (movie.length > 0) {
      return true;
    }
    return false;
  }
  public async getMovie(): Promise<any> {
    const movie = await this.movieRepository.find();
    return movie;
  }
}
