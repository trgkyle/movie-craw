import * as puppeteer from 'puppeteer';
import * as UserAgent from 'user-agents';

const argsChromeOptions = ({ proxy }) => {
  let prodOptions = ['--no-sandbox', '--disable-setuid-sandbox'];
  let devOptions = ['--window-size=250,480'];
  const commonOptions = ['--lang=en-GB'];

  if (proxy) {
    commonOptions.push(`--proxy-server=${proxy}`);
  }
  Array.prototype.push.apply(prodOptions, commonOptions);
  Array.prototype.push.apply(devOptions, commonOptions);

  console.log(process.env.NODE_ENV === 'production' ? prodOptions : devOptions);

  return process.env.NODE_ENV === 'production' ? prodOptions : devOptions;
};
const chromeOptions = ({ proxy }) => ({
  slowMo: 50,
  headless: process.env.NODE_ENV === 'production' ? true : false,
  defaultViewport: null,
  args: argsChromeOptions({ proxy }),
});
let browser = null;
// ############################## BROWSER ##############################
export async function getBrowser(proxy?: string) {
  if (browser) {
    return browser;
  } else {
    browser = await puppeteer.launch(chromeOptions({ proxy }));
    return browser;
  }
}

// handle action page in browser
export async function goPage(params: {
  url: string;
  cookie: string;
  browser: puppeteer.Browser;
}): Promise<puppeteer.Page> {
  const userAgent = new UserAgent({ deviceCategory: 'desktop' });
  const context = await params.browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  try {
    await page.setUserAgent(userAgent.toString());
    page.setDefaultTimeout(5000);
    page.setDefaultNavigationTimeout(50000);
    if (params.cookie) await setCookie(page, params.cookie);
    await page.goto(params.url, { waitUntil: 'networkidle0' });
  } catch (e) {
    console.log('ERROR GO PAGE');
  } finally {
    return page;
  }
}

export async function closePage(page: puppeteer.Page) {
  if (page) await page.close();
  else {
    console.log('Cannot close page some thing wrong');
  }
}
export async function closeBrowser(browser: puppeteer.Browser) {
  await browser.close();
}

export async function getCookie(page: puppeteer.Page) {
  return JSON.stringify(await page.cookies(), null, 2);
}

export async function setCookie(page: puppeteer.Page, cookiesParams: string) {
  const cookies = JSON.parse(cookiesParams);
  await page.setCookie(...cookies);
}

export async function clickSpanText(page, content) {
  const linkHandlers = await page.$x(`//span[contains(text(), '${content}')]`);
  if (linkHandlers.length > 0) {
    await linkHandlers[0].click();
  } else {
    throw 'span text not found';
  }
}
export async function getSpanTextBySubText(page, subtext): Promise<string> {
  const linkHandlers = await page.$x(`//span[contains(text(), '${subtext}')]`);
  if (linkHandlers.length > 0) {
    return getContentOfSelector(linkHandlers[0]);
  } else {
    // console.log("Span subtext not found");
    // return 0;
    throw 'span subtext not found';
  }
}

export async function getContentOfSelector(elementHandle) {
  let spanElement;
  spanElement = elementHandle;
  spanElement = await spanElement.getProperty('innerText');
  spanElement = await spanElement.jsonValue();
  return spanElement;
}

export async function getDataByAPI(fPage, url) {
  return new Promise((resolve, reject) => {
    fPage.on('response', async (response) => {
      // console.log(response.url());
      if (response.url() == url) {
        console.log('XHR response received');
        const data = await response.json();
        resolve(data);
        return;
        // return getReactionByData(data);
      }
    });
  });
}

export async function getPageSource(page): Promise<string> {
  const data = await page.evaluate(() => document.querySelector('*').outerHTML);
  return data;
}
