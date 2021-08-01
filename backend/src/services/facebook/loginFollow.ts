import { getCookie } from '../common';
import * as prompt from 'prompt';

export async function loginFacebook(fpage, user: string, pass: string) {
  // username
  try {
    await fpage.waitForSelector('input[name=email]');

    await fpage.type('input[name=email]', user);
    // password
    await fpage.type('input[name=pass]', pass);

    // login
    await fpage.click('button[name=login]');

    await fpage.waitForNavigation();

    await checkLoginDirect(fpage);


    return getCookie(fpage);
  } catch (e) {
    console.log('Not login page, may we can go');
    throw e;
  }
}

export async function checkIsLogin(fpage) {
  try {
    await fpage.waitForSelector('div[aria-label="Create a post"]');
  } catch (e) {
    console.log('Cannot Login');
    throw 'Cannot Login';
  }
}
export async function checkLoginDirect(fpage) {
  const url = await fpage.url();
  if (/login/.test(url)) {
    console.log('Some thing was wrong with login account');
    throw 'Some thing was wrong with login account';
  }
  if (/checkpoint/.test(url)) {
    console.log('Go check point page !!!');
    await twoFactorAuthentication(fpage);
  }
  // await checkIsLogin(fpage);
}
export async function twoFactorAuthentication(fpage) {
  try {
    await fpage.waitForSelector('input[name=approvals_code]');
    prompt.start();
    const result = await prompt.get(['code']);
    const code = result.code;
    await fpage.type('input[name=approvals_code', code);
    await fpage.click('button#checkpointSubmitButton');
    await fpage.waitForNavigation();
    //remember browser
    await fpage.click('button#checkpointSubmitButton');
    await fpage.waitForNavigation();
    //check stranger
    await fpage.click('button#checkpointSubmitButton');
    await fpage.waitForNavigation();
    // accept
    await fpage.click('button#checkpointSubmitButton');
    await fpage.waitForNavigation();
    //remember browser two
    await fpage.click('button#checkpointSubmitButton');
    await fpage.waitForNavigation();
  } catch (e) {
    console.log('May not need two factor');
  }
}
