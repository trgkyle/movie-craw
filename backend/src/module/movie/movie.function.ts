import {
  MovieEntity,
  MovieLinkEntity,
  MoviePartEntity,
  MovieServerEntity,
} from './movie.entity';
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
    @InjectRepository(MoviePartEntity)
    private moviePartRepository: Repository<MoviePartEntity>,
    @InjectRepository(MovieServerEntity)
    private movieServerRepository: Repository<MovieServerEntity>,
    @InjectRepository(MovieLinkEntity)
    private movieLinkRepository: Repository<MovieLinkEntity>,
  ) {}

  public async createNewMovie(
    name,
    description,
    poster,
    provider,
    server,
    link,
  ): Promise<Boolean> {
    const movie = await this.checkMovieExist(name);
    if (!movie) {
      const newMovie = new MovieEntity();
      newMovie.name = name;
      newMovie.description = description;
      newMovie.poster = poster;
      const newMoviePart = new MoviePartEntity();
      newMoviePart.type = 'phim-le';
      newMoviePart.part = 'FULL';
      const newMovieServer = new MovieServerEntity();
      newMovieServer.provider = provider;
      const newMovieLink = new MovieLinkEntity();
      newMovieLink.name = server;
      newMovieLink.providerLink = '';
      newMovieLink.videoLink = link;

      newMovieServer.movieLinks = [newMovieLink];
      newMoviePart.movieServers = [newMovieServer];
      newMovie.movieParts = [newMoviePart];
      await this.movieLinkRepository.save(newMovieLink);
      await this.movieServerRepository.save(newMovieServer);
      await this.moviePartRepository.save(newMoviePart);
      await this.movieRepository.save(newMovie);
      return true;
    } else {
      // const categoryLink = await this.checkCategoryLinkExist(provider, link);
      // if (!categoryLink) {
      //   const newCategoryLink = new CategoryLinkEntity();
      //   newCategoryLink.provider = provider;
      //   newCategoryLink.link = link;
      //   newCategoryLink.category = category;
      //   category.categoryLinks.push(newCategoryLink);
      //   await this.categoryLinkRepository.save(newCategoryLink);
      // }
      // await this.categoryRepository.save(category);
      // return true;
    }
  }
  public async checkMovieExist(name): Promise<any> {
    const movie = await this.movieRepository.find({ name });
    if (movie.length > 0) {
      return true;
    }
    return false;
  }
  public async getAllMovies(): Promise<any> {
    const movie = await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movieParts', 'movie-part')
      .leftJoinAndSelect('movie-part.movieServers', 'movie-server')
      .leftJoinAndSelect('movie-server.movieLinks', 'movie-link')
      .getMany();
    return movie;
  }
  public async getMovieById(id: Number): Promise<any> {
    const movie = await this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.id = :id', { id })
      .leftJoinAndSelect('movie.movieParts', 'movie-part')
      .leftJoinAndSelect('movie-part.movieServers', 'movie-server')
      .leftJoinAndSelect('movie-server.movieLinks', 'movie-link')
      .getOne();
    return movie;
  }
}
