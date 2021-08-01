import { loginGoogle } from './loginFollow';
import { registerGoogleAccountOfficial } from './registerFollow';
export async function googleInit(
  page,
  username,
  password,
  cookie?,
): Promise<{ page: any; cookie: string }> {
  try {
    const cookieAccount = await loginGoogle(page, username, password);
    return { page: page, cookie: cookieAccount };
  } catch (e) {
    console.log('ERROR IN Google INIT');
    throw 'ERROR IN Google INIT';
  }
}
export async function googleRegisterAccountStepOne({
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
    const cookieAccount = await registerGoogleAccountOfficial({
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
    console.log('ERROR IN Google INIT');
    throw 'ERROR IN Google INIT';
  }
}
export async function googleRegisterAccountStepOneMobile({
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
    const cookieAccount = await registerGoogleAccountOfficial({
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
    console.log('ERROR IN Google INIT');
    throw 'ERROR IN Google INIT';
  }
}
