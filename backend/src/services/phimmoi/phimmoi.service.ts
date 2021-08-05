import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { closePage, getBrowser, goPage } from '../common';
import {
  getCategories,
  getFilmDetailInfo,
  getFilmLink,
  getVideoLink,
  startWatchFilm,
} from '../../services/phimmoi';

@Injectable()
export class PhimmoiService {
  private readonly logger = new Logger(PhimmoiService.name);
  constructor(
  ) {}
  public async getPhimmoiCategoires() {
    try {
      const browser = await getBrowser();
      let phimmoiPage = await goPage({
        url: 'https://phimmoii.org/',
        cookie: undefined,
        browser,
      });
      try {
        const categoresLinks = (await getCategories(phimmoiPage));
        return categoresLinks;
      } catch (e) {
        this.logger.log('ERROR PHIMMOI PAGE');
        return null;
      } finally {
        await closePage(phimmoiPage);
      }
    } catch (e) {
      this.logger.log('ERROR PHIMMOI PAGE');
    }
  }

  public async getPhimmoiFilmListLinkByCategories(categorieLink) {
    try {
      const browser = await getBrowser();
      let phimmoiPage = await goPage({
        url: categorieLink,
        cookie: undefined,
        browser,
      });
      try {
        const firmDetail = await getFilmLink(phimmoiPage);
        return firmDetail;
      } catch (e) {
        this.logger.log('ERROR PHIMMOI PAGE');
        return null;
      } finally {
        await closePage(phimmoiPage);
      }
    } catch (e) {
      this.logger.log('ERROR PHIMMOI PAGE');
    }
  }

  public async getFilmVideoLink(FilmLink) {
    try {
      const browser = await getBrowser();
      let phimmoiPage = await goPage({
        url: FilmLink,
        cookie: undefined,
        browser,
      });
      try {
        await startWatchFilm(phimmoiPage);
        const filmSrc = await getVideoLink(phimmoiPage);
        return filmSrc;
      } catch (e) {
        this.logger.log('ERROR PHIMMOI PAGE');
      } finally {
        await closePage(phimmoiPage);
      }
    } catch (e) {
      this.logger.log('ERROR PHIMMOI PAGE');
    }
  }

  public async getFilmDetail(filmLink) {
    try {
      const browser = await getBrowser();
      let phimmoiPage = await goPage({
        url: filmLink,
        cookie: undefined,
        browser,
      });
      try {
        const filmInfo = await getFilmDetailInfo(phimmoiPage);
        return filmInfo;
      } catch (e) {
        this.logger.log('ERROR PHIMMOI PAGE');
      } finally {
        await closePage(phimmoiPage);
      }
    } catch (e) {
      this.logger.log('ERROR PHIMMOI PAGE');
    }
  }
}
