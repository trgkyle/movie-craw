import * as puppeteer from 'puppeteer';
export async function getCategories(
  page: puppeteer.Page,
): Promise<{ href: Array<any> }> {
  try {
    await page.waitForSelector('.footer-link > a');
    const link = [];
    const aHref = await page.$$('.footer-link > a');
    const yourHref = await Promise.all(
      (await Promise.all(aHref.map((a) => a.getProperty('href')))).map((href) =>
        href.jsonValue(),
      ),
    );
    return { href: yourHref };
  } catch (e) {
    console.log(e);
  }
  return null;
}
export async function getFirmLinkDetail(
  page: puppeteer.Page,
): Promise<{ href: Array<any> }> {
  try {
    await page.waitForSelector('.movie-item > a');
    const aHref = await page.$$('.movie-item > a');
    console.log(aHref);
    const yourHref = await Promise.all(
      (await Promise.all(aHref.map((a) => a.getProperty('href')))).map((href) =>
        href.jsonValue(),
      ),
    );
    return { href: yourHref };
  } catch (e) {
    console.log(e);
  }
  return null;
}
export async function startWatchFirm(
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
): Promise<{ src: any }> {
  try {
    const frame = await (await page.$('.film-view iframe')).contentFrame();
    await frame.waitForSelector('iframe', { timeout: 30000 });
    const iframe = await frame.$('iframe');
    const src = await (await iframe.getProperty('src')).jsonValue();
    return { src };
  } catch (e) {
    console.log(e);
  }
  return null;
}
