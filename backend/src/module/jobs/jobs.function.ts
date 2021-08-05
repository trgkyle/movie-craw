import { JobsEntity } from './jobs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
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
    if (this.isRunJob) return;
    this.isRunJob = true;
    const jobs = await this.jobsRepository.find({ status: false });
    console.log(jobs);
    for (const job of jobs) {
      // job.status = true;
      await this.jobsRepository.save(job);
      const jobType = job.job_type;
      try {
        // Run job
        switch (jobType) {
          case JOB_TYPE.PHIMMOI_FILM_LIST:
            console.log("EE");
            const categoriesLink = await this.categoryFunction.getAllCategories();
            for(const category of categoriesLink) {
              for(const categoryLink of category.categoryLinks) {
                const FilmList = await this.phimmoiService.getPhimmoiFilmListLinkByCategories(categoryLink.link);
                console.log(FilmList);
                // Film Detail
                for(const film of FilmList) {
                  const movie = await this.phimmoiService.getFilmDetail(film);
                  // const movieLink = await this.phimmoiService.getFilmVideoLink(film);
                  // console.log(movieLink);
                  await this.movieFunction.createNewMovie(movie.title, movie.description, movie.poster);
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
      const newJob = new JobsEntity();
      newJob.job_type = type;
      newJob.status = false;
      await this.jobsRepository.save(newJob);
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
