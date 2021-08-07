import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';

@Entity('movie')
export class MovieEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() name: string;
  @Column() description: string;
  @Column() poster: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany((type) => MoviePartEntity, (movieLink) => movieLink.movie)
  movieParts: MoviePartEntity[];
  @ManyToMany(type => CategoryEntity, category => category.movies)
  categories: CategoryEntity[]; 
}

@Entity('movie-part')
export class MoviePartEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() type: string;
  @Column() part: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne((type) => MovieEntity, (movie) => movie.movieParts)
  movie: MovieEntity;
  @OneToMany((type) => MovieServerEntity, (movieLink) => movieLink.moviePart)
  movieServers: MovieServerEntity[];
  
}

@Entity('movie-server')
export class MovieServerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() provider: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne((type) => MoviePartEntity, (movie) => movie.movieServers)
  moviePart: MoviePartEntity;
  @OneToMany((type) => MovieLinkEntity, (movieLink) => movieLink.movieServer)
  movieLinks: MovieLinkEntity[];
}

@Entity('movie-link')
export class MovieLinkEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true}) name: string;
  @Column() providerLink: string;
  @Column({ nullable: true}) videoLink: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne((type) => MovieServerEntity, (movie) => movie.movieLinks)
  movieServer: MovieServerEntity;
}