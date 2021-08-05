import { AuthenModule } from '../authen/authen.module';
import { MovieResolver } from './movie.resolver';
import { MovieEntity } from './movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovieFunction } from './movie.function';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [MovieResolver, MovieFunction],
  exports: [
    MovieResolver,
    MovieFunction,
    TypeOrmModule.forFeature([MovieEntity]),
  ],
})
export class MovieModule {
}
