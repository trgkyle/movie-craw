import { AuthenModule } from '../authen/authen.module';
import { MovieResolver } from './movie.resolver';
import { MovieEntity, MovieLinkEntity } from './movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovieFunction } from './movie.function';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), AuthenModule],
  providers: [MovieResolver, MovieFunction],
  exports: [
    MovieResolver,
    MovieFunction,
    TypeOrmModule.forFeature([MovieEntity]),
  ],
})
export class MovieModule {
  constructor(private MovieService: MovieFunction) {
    // try {
    //   this.MovieService.checkMovieExist('admin@admin.com').then(data => {
    //     if(data) return;
    //     this.MovieService.registerMovie('admin@admin.com', '123qweasd');
    //   });
    // } catch (e) {
    //   console.log("Should remove");
    // }
  }
}
