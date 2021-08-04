import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { closePage, getBrowser, goPage } from '../common';
import {
  getCategories,
  getFirmLinkDetail,
  getVideoLink,
  startWatchFirm,
} from 'src/services/phimmoi';

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
        const categoresLinks = (await getCategories(phimmoiPage)).href;
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

  public async getPhimmoiFirmListLinkByCategories(categorieLink) {
    try {
      const browser = await getBrowser();
      let phimmoiPage = await goPage({
        url: 'https://phimmoii.org/' + categorieLink,
        cookie: undefined,
        browser,
      });
      try {
        const firmLinks = (await getFirmLinkDetail(phimmoiPage)).href;
        return firmLinks;
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

  public async getFirmVideoLink(firmLink) {
    try {
      const browser = await getBrowser();
      let phimmoiPage = await goPage({
        url: 'https://phimmoii.org/' + firmLink,
        cookie: undefined,
        browser,
      });
      try {
        await startWatchFirm(phimmoiPage);
        const firmSrc = await getVideoLink(phimmoiPage);
        return firmSrc;
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
