import * as puppeteer from 'puppeteer';
export async function getCategories(page: puppeteer.Page): Promise<Array<any>> {
  try {
    await page.waitForSelector('.footer-link > a');
    const categories = [];
    const aHref = await page.$$('.footer-link > a');
    for (const a of aHref) {
      const text = await page.evaluate((element) => element.textContent, a);
      const href = await page.evaluate((element) => element.href, a);
      categories.push({ text, href });
    }
    return categories;
  } catch (e) {
    console.log(e);
  }
  return null;
}
export async function getFilmLink(page: puppeteer.Page): Promise<Array<any>> {
  try {
    const categories = [];
    await page.waitForSelector('.movie-item > a');
    const aHref = await page.$$('.movie-item > a');
    for (const a of aHref) {
      const href = await page.evaluate((element) => element.href, a);
      categories.push(href);
    }
    return categories;
  } catch (e) {
    console.log(e);
  }
  return null;
}
export async function getFilmDetailInfo(
  page: puppeteer.Page,
): Promise<{ title: String; description: String; poster: String }> {
  try {
    await page.waitForSelector('a.title-1');
    await page.waitForSelector('#film-content > p');
    await page.waitForSelector('.movie-image img');
    const a = await page.$('a.title-1');
    const title = await page.evaluate((element) => element.textContent, a);
    const p = await page.$('#film-content > p');
    const description = await page.evaluate(
      (element) => element.textContent,
      p,
    );
    const img = await page.$('.movie-image img');
    const poster = await page.evaluate((element) => element.src, img);
    return { title, description, poster };
  } catch (e) {
    console.log(e);
  }
  return null;
}
export async function startWatchFilm(
  page: puppeteer.Page,
): Promise<{ href: Array<any> }> {
  try {
    await page.waitForSelector('#btn-film-watch');
    await page.click('#btn-film-watch');
    await page.waitForNavigation();
  } catch (e) {
    console.log(e);
  }
  return null;
}
export async function getVideoLink(
  page: puppeteer.Page,
): Promise<{ link: any; server: any }> {
  try {
    const frame = await (await page.$('.film-view iframe')).contentFrame();
    await frame.waitForSelector('iframe', { timeout: 30000 });
    const iframe = await frame.$('iframe');
    const link = await (await iframe.getProperty('src')).jsonValue();
    const option = await page.$('#list-server span.disabled');
    const server = await page.evaluate((element) => element.textContent, option);
    return { link, server };
  } catch (e) {
    console.log(e);
  }
  return null;
}
