import { JobsEntity } from './jobs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import * as pLimit from 'p-limit';
import { JOB_TYPE } from './jobs.constant';
import { MovieFunction } from '../movie/movie.function';
import { PhimmoiService } from '../../services/phimmoi/phimmoi.service';
import { CategoryFunction } from '../category/category.function';

@Injectable()
export class JobsFunction {
  constructor(
    @InjectRepository(JobsEntity)
    private jobsRepository: Repository<JobsEntity>,
    private movieFunction: MovieFunction,
    private categoryFunction: CategoryFunction,
    private phimmoiService: PhimmoiService,
  ) {}
  private isRunJob: Boolean;
  public async checkAndRunsJob() {
    const limit = pLimit(1);
    if (this.isRunJob) return;
    this.isRunJob = true;
    const jobs = await this.jobsRepository.find({ status: false });
    console.log(jobs);
    for (const job of jobs) {
      job.status = true;
      await this.jobsRepository.save(job);
      const jobType = job.job_type;
      try {
        // Run job
        switch (jobType) {
          case JOB_TYPE.PHIMMOI_FILM_DETAIL:
            let filmLinkList = await this.movieFunction.getMovieLinkNotCrawlDetailYet();
            filmLinkList = filmLinkList.map(async (filmLink) =>
              limit(async () => {
                const movie = await this.phimmoiService.getFilmDetail(
                  filmLink.providerLink,
                );
                const categories = [];
                for (const category of movie.categories) {
                  await this.categoryFunction.createNewCategory(
                    category.text,
                    '',
                    'phimmoi',
                    category.href,
                  );
                  categories.push(
                    await this.categoryFunction.getCategoryByName(
                      category.text,
                    ),
                  );
                }
                const movieLink = await this.phimmoiService.getFilmVideoLink(
                  filmLink.providerLink,
                );
                await this.movieFunction.createNewMovie({
                  category: categories,
                  name: movie.title,
                  description: movie.description,
                  poster: movie.poster,
                  provider: 'phimmoi',
                  server: movieLink.server,
                  link: movieLink.link,
                });
              }),
            );
            await Promise.all(filmLinkList);
            break;
            // for(const category of categoriesList) {
            //   for(const categoryLink of category.categoryLinks) {
            //     const filmList = await this.phimmoiService.getPhimmoiFilmListLinkByCategories(categoryLink.link);
            //     // console.log(filmList);
            //     // Film Detail
            //     for(const film of filmList) {
            //       console.log(film);
            //       const movie = await this.phimmoiService.getFilmDetail(film);
            //       const movieLink = await this.phimmoiService.getFilmVideoLink(film);
            //       await this.movieFunction.createNewMovie(category,movie.title, movie.description, movie.poster, 'phimmoi', movieLink.server, movieLink.link);
            //     }
            //   }
            // }
            break;
          case JOB_TYPE.PHIMMOI_FILM_LIST:
            const categoriesList = await this.categoryFunction.getAllCategories();
            console.log('list', categoriesList);
            for (const category of categoriesList) {
              for (const categoryLink of category.categoryLinks) {
                const filmList = await this.phimmoiService.getPhimmoiFilmListLinkByCategories(
                  categoryLink.link,
                );
                for (const film of filmList) {
                  await this.movieFunction.createNewMovieLink(film);
                }
              }
            }
            break;
          case JOB_TYPE.PHIMMOI_CATEGORY_LIST:
            const categoriesLinks = await this.phimmoiService.getPhimmoiCategoires();
            for (const categoryLink of categoriesLinks) {
              console.log(categoryLink);
              await this.categoryFunction.createNewCategory(
                categoryLink.text,
                '',
                'phimmoi',
                categoryLink.href,
              );
            }
            // await Promise.all(
            //   categoriesLink.map(async (category) => {
            //     return
            //     // console.log(category);
            //     // const FilmList = await this.phimmoiService.getPhimmoiFilmListLinkByCategories(category);
            //     // linkFilmByCategoriesGroup.push({ category, FilmList });
            //   }),
            // );
            console.log('DO Film PHIMMOI CRAWL');
            break;
        }
        // End run job
      } catch (e) {
        console.log(e);
      }
    }
    this.isRunJob = false;
  }
  public async addJob(type): Promise<any> {
    try {
      const job = await this.jobsRepository.findOne({ job_type: type });
      if (job) {
        job.status = false;
        await this.jobsRepository.save(job);
        return true;
      } else {
        const newJob = new JobsEntity();
        newJob.job_type = type;
        newJob.status = false;
        await this.jobsRepository.save(newJob);
      }
    } catch (e) {
      return false;
    }
  }
  public async deleteJobs({ id }): Promise<any> {
    try {
      await this.jobsRepository.delete(id);
    } catch (e) {
      throw 'Cannot delete job';
    }
  }
  public async getAllJobs(): Promise<any> {
    const data = await this.jobsRepository.find();
    return data;
  }
}
