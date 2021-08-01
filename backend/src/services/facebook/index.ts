import { loginFacebook } from './loginFollow';
import { registerFacebookAccountMobile, registerFacebookAccountOfficial, verifyCodeRegisterFacebookAccount } from './registerFollow';
export async function facebookInit(
  page,
  username,
  password,
  cookie?,
): Promise<{ page: any; cookie: string }> {
  try {
    const cookieAccount = await loginFacebook(page, username, password);
    return { page: page, cookie: cookieAccount };
  } catch (e) {
    console.log('ERROR IN FACEBOOK INIT');
    throw 'ERROR IN FACEBOOK INIT';
  }
}

export async function facebookRegisterAccountStepTwo({ fPage, code }) {
  try {
    const cookieAccount = await verifyCodeRegisterFacebookAccount({
      fPage,
      code,
    });
    return { page: fPage, cookie: cookieAccount };
  } catch (e) {
    console.log('ERROR IN FACEBOOK INIT');
    throw 'ERROR IN VERIFY CODE';
  }
}
export async function facebookRegisterAccountStepOne({
  fPage,
  firstName,
  lastName,
  email,
  phone,
  password,
  dateOfBirth,
  gender,
}): Promise<{ page: any; cookie: string }> {
  try {
    const cookieAccount = await registerFacebookAccountOfficial({
      fPage,
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      gender,
    });
    return { page: fPage, cookie: cookieAccount };
  } catch (e) {
    console.log('ERROR IN FACEBOOK INIT');
    throw 'ERROR IN FACEBOOK INIT';
  }
}

export async function facebookRegisterAccountStepOneMobile({
  fPage,
  firstName,
  lastName,
  email,
  phone,
  password,
  dateOfBirth,
  gender,
}): Promise<{ page: any; cookie: string }> {
  try {
    const cookieAccount = await registerFacebookAccountMobile({
      fPage,
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      gender,
    });
    return { page: fPage, cookie: cookieAccount };
  } catch (e) {
    console.log('ERROR IN FACEBOOK INIT');
    throw 'ERROR IN FACEBOOK INIT';
  }
}
