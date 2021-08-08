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
  JoinTable,
} from 'typeorm';
import { MovieEntity } from '../movie/movie.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true}) name: string;
  @Column({ nullable: true}) description: string;
  @Column() type: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany((type) => CategoryLinkEntity, (categoryLink) => categoryLink.category)
  categoryLinks: CategoryLinkEntity[];
  @ManyToMany(type => MovieEntity, movie => movie.categories)
  @JoinTable()
  movies: MovieEntity[]; 
}

@Entity('category-link')
export class CategoryLinkEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() provider: string;
  @Column({ unique: true}) link: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne((type) => CategoryEntity, (movie) => movie.categoryLinks)
  category: CategoryEntity;
}
