import { getCookie } from '../common';
import * as prompt from 'prompt';
import { timeout } from 'cron';
import { timeWaiting } from '../../services/common/resolver';
async function setSelectVal(sel, val, page) {
  await page.evaluate(
    (data) => {
      return (document.querySelector(data.sel).value = data.val);
    },
    { sel, val },
  );
}

export async function registerFacebookAccountOfficial({
  fPage,
  firstName,
  lastName,
  email,
  phone,
  password,
  dateOfBirth,
  gender,
}) {
  // username
  try {
    // is need accept cookie modal
    try {
      await fPage.waitForSelector(
        `div[aria-labelledby="cookie_banner_title"] button[data-cookiebanner='accept_button']`,
        {
          timeout: 3000,
        },
      );
      await fPage.click(
        `div[aria-labelledby="cookie_banner_title"] button[data-cookiebanner='accept_button']`,
      );
    } catch (e) {}
    await fPage.waitForSelector(
      `form[data-testid="royal_login_form"] div a[data-testid='open-registration-form-button']`,
    );
    await fPage.click(
      `form[data-testid="royal_login_form"] div a[data-testid='open-registration-form-button']`,
    );

    await fPage.waitForSelector(`input[name=firstname]`);
    await fPage.type('input[name=firstname]', firstName);

    await timeWaiting(1241);
    await fPage.waitForSelector(`input[name=lastname]`);
    await fPage.type('input[name=lastname]', lastName);

    await timeWaiting(1973);
    await fPage.waitForSelector(`input[name='reg_email__']`);
    await fPage.type(
      `input[name='reg_email__']`,
      !!email ? email.split('@')[0] + '@gmail.com' : phone,
    );

    await timeWaiting(1134);
    if (!!email) {
      await fPage.waitForSelector(`input[name='reg_email_confirmation__']`);
      await fPage.type(
        `input[name='reg_email_confirmation__']`,
        email.split('@')[0] + '@gmail.com',
      );
    }

    await fPage.waitForSelector(`input[name='reg_passwd__']`);
    await fPage.type(`input[name='reg_passwd__']`, password);

    const date = new Date(+dateOfBirth);
    await timeWaiting(2352);
    await setSelectVal(`select[name='birthday_day']`, date.getDate(), fPage);

    await timeWaiting(1162);
    await setSelectVal(
      `select[name='birthday_month']`,
      date.getMonth() + 1,
      fPage,
    );

    await timeWaiting(1563);
    await setSelectVal(
      `select[name='birthday_year']`,
      date.getFullYear(),
      fPage,
    );

    await timeWaiting(784);
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

    await timeWaiting(12780);

    const [button] = await fPage.$x("//button[contains(text(), 'Sign Up')]");
    if (button) {
      await button.click();
    }

    await fPage.waitForNavigation();
    const url = await fPage.url();

    if (/checkpoint/.test(url)) {
      console.log('Go check point page !!!');
      throw 'Go to check point page';
    } else if (/confirmemail/.test(url)) {
      console.log('Waiting confirm Code validate account');
      console.log('Return cookie');
      return getCookie(fPage);
    }
    throw 'Some thing error?';
  } catch (e) {
    console.log(e);
    console.log('Cannot Register');
    throw e;
  }
}

export async function registerFacebookAccountMobile({
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
    let flag = false;
    do {
      // register button direct
      await fPage.waitForSelector(
        `div[id=signup_button_area] a[id=signup-button]`,
      );
      await fPage.click(`div[id=signup_button_area] a[id=signup-button]`);
      await fPage.waitForNavigation();
      // first name
      await timeWaiting('normal');
      await fPage.waitForSelector(`input[name=firstname]`);
      await fPage.type('input[name=firstname]', firstName);

      // last name
      await timeWaiting('normal');
      await fPage.waitForSelector(`input[name=lastname]`);
      await fPage.type('input[name=lastname]', lastName);

      // next
      await timeWaiting('normal');
      await fPage.waitForSelector(
        `button[type=submit][data-sigil="touchable multi_step_next"]`,
      );
      await fPage.click(
        `button[type=submit][data-sigil="touchable multi_step_next"]`,
      );

      // birth day
      const date = new Date(+dateOfBirth);
      await timeWaiting('normal');
      await setSelectVal(
        `select[name='birthday_day']`,
        !!date.getDate().toString() ? date.getDate() : 7,
        fPage,
      );

      await timeWaiting('normal');
      await setSelectVal(
        `select[name='birthday_month']`,
        !!date.getMonth() ? date.getMonth() + 1 : 8,
        fPage,
      );

      await timeWaiting('normal');
      await setSelectVal(
        `select[name='birthday_year']`,
        !!date.getFullYear().toString() ? date.getFullYear().toString() : 2000,
        fPage,
      );

      // next
      await timeWaiting('normal');
      await fPage.waitForSelector(
        `button[type=submit][data-sigil="touchable multi_step_next"]`,
      );
      await fPage.click(
        `button[type=submit][data-sigil="touchable multi_step_next"]`,
      );

      // switch to confirm email
      await timeWaiting('normal');
      await fPage.waitForSelector(`a[data-sigil="switch_phone_to_email"]`);
      await fPage.click(`a[data-sigil="switch_phone_to_email"]`);

      await timeWaiting('normal');
      await fPage.waitForSelector(`input[name='reg_email__']`);
      await fPage.type(
        `input[name='reg_email__']`,
        email.split('@')[0] + '@gmail.com',
      );

      // next
      await timeWaiting('normal');
      await fPage.waitForSelector(
        `button[type=submit][data-sigil="touchable multi_step_next"]`,
      );
      await fPage.click(
        `button[type=submit][data-sigil="touchable multi_step_next"]`,
      );

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

      await fPage.waitForSelector(`input[name='reg_passwd__']`);
      await fPage.type(`input[name='reg_passwd__']`, password);

      // sign up
      await timeWaiting('normal');
      await fPage.waitForSelector(`button[type=submit][name=submit]`);
      await fPage.click(`button[type=submit][name=submit]`);

      await fPage.waitForNavigation();
      let url = await fPage.url();

      if (/checkpoint/.test(url)) {
        console.log('Go check point page !!!');
        await fPage.waitForSelector(`button[type='submit']`);
        await fPage.click(`button[type=submit]`);
        await fPage.waitForNavigation();
        let imNotARobot = false;
        do {
          await fPage.waitForSelector(`iframe`, {
            timeout: 30000,
          });
          const frame = await (await fPage.$$(`iframe`))[0].contentFrame();
          await frame.waitForSelector(`#recaptcha-anchor`, { timeout: 30000 });
          await frame.click(`#recaptcha-anchor`);
        } while (!imNotARobot);
        await fPage.waitForSelector(`button[type='submit']`);
        await fPage.click(`button[type=submit]`);
        throw 'Go to check point page';
      } else if (/save-device/.test(url)) {
        console.log('SAVE DEVICES');
        flag = true;
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
    } while (!flag);
    return getCookie(fPage);
  } catch (e) {
    console.log(e);
    console.log('Cannot Register');
    throw e;
  }
}
export async function verifyCodeRegisterFacebookAccountMobile({ fPage, code }) {
  try {
    try {
      await fPage.waitForSelector(`input[type="number"][name="c"]`, {
        timeout: 3000,
      });
      await fPage.type(`input[type="number"][name="c"][maxlength="5"]`, code);
    } catch (e) {
      console.log('NOT 6 code input');
      await fPage.waitForSelector(`input[maxlength="5"]`);
      await fPage.type(`input[maxlength="5"]`, code);
    }

    await timeWaiting('normal');
    await fPage.waitForSelector(`form[method="post"] > a[href="#"]`);
    const aHref = await fPage.$$(`form[method="post"] > a[href="#"]`);
    await aHref[0].click();
    await fPage.waitForNavigation();
    console.log('Register Success');
  } catch (e) {
    console.log(e);
    console.log('Error Verify Code Register Facebook Account Mobile');
    throw 'Error Verify Code Register Facebook Account Mobile';
  }
}
export async function verifyCodeRegisterFacebookAccount({ fPage, code }) {
  try {
    await fPage.waitForSelector(
      `div[id="conf_dialog_middle_components"] input[id="code_in_cliff"]`,
    );
    await fPage.type(
      `div[id="conf_dialog_middle_components"] input[id="code_in_cliff"]`,
      code,
    );
    await fPage.waitForSelector(`button[value=1][name=confirm][type=submit]`);
    await fPage.click(`button[value=1][name=confirm][type=submit]`);
    await fPage.waitForNavigation();
  } catch (e) {
    console.log('Error Verify Code Register Facebook Account');
    throw 'Error Verify Code Register Facebook Account';
  }
}
