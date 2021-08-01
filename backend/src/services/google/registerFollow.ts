import { getCookie } from '../common';
import * as prompt from 'prompt';
import { timeout } from 'cron';
import { timeWaiting } from '../common/resolver';
async function setSelectVal(sel, val, page) {
  await page.evaluate(
    (data) => {
      return (document.querySelector(data.sel).value = data.val);
    },
    { sel, val },
  );
}

export async function registerGoogleAccountOfficial({
  fPage,
  firstName,
  lastName,
  email,
  phone,
  password,
  dateOfBirth,
  gender,
}) {
  // accept cookie
  try {
    await fPage.waitForSelector(`a[data-cookiebanner="accept_button"]`, {
      timeout: 3000,
    });
    await fPage.click(`a[data-cookiebanner="accept_button"]`);
  } catch (e) {
    console.log('Ignore accept cookie modal');
  }
  // username
  try {
    // register button direct
    await fPage.waitForSelector(`div[role="button"] span[jsslot]`);
    await fPage.click(`div[role="button"] span[jsslot]`);
    await fPage.waitForSelector(`div[role="menu"] span[role="menuitem"]`);
    const menuItemSignIn = await fPage.$$('div[role="menu"] span[role="menuitem"]');
    await menuItemSignIn[0].click();
    await fPage.waitForNavigation();
    // first name
    await timeWaiting('normal');
    await fPage.waitForSelector(`input[id="firstName"]`);
    await fPage.type('input[id="firstName"]', firstName);

    // last name
    await timeWaiting('normal');
    await fPage.waitForSelector(`input[id="lastName"]`);
    await fPage.type('input[id="lastName"]', lastName);

    // password
    await timeWaiting('normal');
    await fPage.waitForSelector(`input[name="Passwd"]`);
    await fPage.type(`input[name="Passwd"]`, password);
    // confirm password
    await timeWaiting('normal');
    await fPage.waitForSelector(`input[name="ConfirmPasswd"]`);
    await fPage.type(`input[name="ConfirmPasswd"]`, password);

    // next
    await timeWaiting('normal');
    await fPage.waitForSelector(
      `div[id="accountDetailsNext"] button`,
    );
    await fPage.click(
      `div[id="accountDetailsNext"] button`,
    );
    await fPage.waitForNavigation();
    let url = await fPage.url();
    if (/webgradsidvphone/.test(url)) {
      console.log('Go verify phone');
      await timeWaiting(5000);
      throw 'Go verify phone';
    }
    // birth day
    // const date = new Date(+dateOfBirth);
    // await timeWaiting('normal');
    // await setSelectVal(
    //   `select[name='birthday_day']`,
    //   !!date.getDate().toString() ? date.getDate().toString() : 7,
    //   fPage,
    // );

    // await timeWaiting('normal');
    // await setSelectVal(
    //   `select[name='birthday_month']`,
    //   !!date.getMonth().toString() ? date.getMonth().toString() : 8,
    //   fPage,
    // );

    // await timeWaiting('normal');
    // await setSelectVal(
    //   `select[name='birthday_year']`,
    //   !!date.getFullYear().toString() ? date.getFullYear().toString() : 2000,
    //   fPage,
    // );

    // next
    // await timeWaiting('normal');
    // await fPage.waitForSelector(
    //   `button[type=submit][data-sigil="touchable multi_step_next"]`,
    // );
    // await fPage.click(
    //   `button[type=submit][data-sigil="touchable multi_step_next"]`,
    // );

    // switch to confirm email
    // await timeWaiting('normal');
    // await fPage.waitForSelector(`a[data-sigil="switch_phone_to_email"]`);
    // await fPage.click(`a[data-sigil="switch_phone_to_email"]`);

    // await timeWaiting('normal');
    // await fPage.waitForSelector(`input[name='reg_email__']`);
    // await fPage.type(
    //   `input[name='reg_email__']`,
    //   email.split('@')[0] + '@gmail.com',
    // );

    // next
    // await timeWaiting('normal');
    // await fPage.waitForSelector(
    //   `button[type=submit][data-sigil="touchable multi_step_next"]`,
    // );
    // await fPage.click(
    //   `button[type=submit][data-sigil="touchable multi_step_next"]`,
    // );

    // if (!!email) {
    //   await fPage.waitForSelector(`input[name='reg_email_confirmation__']`);
    //   await fPage.type(`input[name='reg_email_confirmation__']`, email);
    // }

    await timeWaiting('normal');

    await fPage.waitForSelector(`input[type='radio'][name='sex'][value='1']`);

    await fPage.evaluate(
      (data) => {
        const radio: any = document.querySelector(
          `input[type='radio'][name='sex'][value='${
            data.gender === 'male' ? 2 : 1
          }']`,
        );
        radio.click();
      },
      { gender },
    );

    // next
    await timeWaiting('normal');
    await fPage.waitForSelector(
      `button[type=submit][data-sigil="touchable multi_step_next"]`,
    );
    await fPage.click(
      `button[type=submit][data-sigil="touchable multi_step_next"]`,
    );

    // sign up
    await timeWaiting('normal');
    await fPage.waitForSelector(`button[type=submit][name=submit]`);
    await fPage.click(`button[type=submit][name=submit]`);

    await fPage.waitForNavigation();
    url = await fPage.url();

    if (/checkpoint/.test(url)) {
      console.log('Go check point page !!!');
      throw 'Go to check point page';
    } else if (/save-device/.test(url)) {
      console.log('SAVE DEVICES');
      // console.log('Waiting confirm Code validate account');
    } else {
      console.log(url);
    }

    // next
    await fPage.waitForSelector(`button[type=submit]`);
    await fPage.click(`button[type=submit]`);
    await fPage.waitForNavigation();

    url = await fPage.url();
    if (/twostepconf/.test(url)) {
      const aHref = await fPage.$$('a[href="#"]');
      await aHref[1].click();
      await fPage.waitForNavigation();
    }

    // switch change email
    const aHref = await fPage.$$('a[href="#"]');
    await aHref[1].click();
    // await fPage.waitForNavigation();

    // click change email
    await fPage.waitForSelector(`a[href="/changeemail"][target="_self"]`);
    await fPage.click(`a[href="/changeemail"][target="_self"]`);
    // await fPage.waitForNavigation();

    // change email
    await fPage.waitForSelector(`input[name='new']`);
    await fPage.type(`input[name='new']`, email);

    await timeWaiting('normal');
    await fPage.waitForSelector(`button[type="submit"][name="submit"]`);
    await fPage.click(`button[type="submit"][name="submit"]`);

    await fPage.waitForNavigation();
    console.log('Return cookie');
    return getCookie(fPage);
  } catch (e) {
    console.log('Cannot Register');
    throw e;
  }
}