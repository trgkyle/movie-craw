import {
  clickSpanText,
  getDataByAPI,
  getSpanTextBySubText,
} from '../common';
import { timeWaiting } from '../common/resolver';

export async function checkCanComment(fPage) {
  try {
    await fPage.waitForSelector('div[aria-label="Write a comment"]');
  } catch (e) {
    console.log("Cannot comment of this post");
    throw "Cannot comment of this Post";
  }
}
export async function checkCanReact(fPage) {
  try {
    await fPage.waitForSelector('div > div[aria-label=Like]');
  } catch (e) {
    console.log("Cannot react of this post");
    throw "Cannot react of this Post";
  }
}
export async function createPost(fPage, content: string) {
  await fPage.goto('https://www.facebook.com/', { waitUntil: 'networkidle0' });
  await fPage.keyboard.press('KeyP');
  await fPage.waitForSelector('input[type=submit]');
  await fPage.keyboard.type(content);
  await fPage.keyboard.down('ControlLeft');
  await fPage.keyboard.press('Enter');
}
export async function goPost(fPage, postLink: string) {
  try {
    await fPage.goto(postLink, { waitUntil: 'networkidle0' });
  } catch (e) {
    console.log("ERROR GO POST");
    throw 'ERROR GO POST';
  }
}
export async function editPost(fPage, content: string) {
  // click edit
  await fPage.click(
    'div[aria-haspopup=menu][aria-label="Actions for this post"]',
  );
  await fPage.waitForSelector('div[role=menuitem]');

  await clickSpanText(fPage, 'Edit post');
  // edit modal
  await fPage.waitForSelector(
    'div[role=presentation] div[contenteditable=true][role=textbox]',
  );

  // edit all text
  await fPage.evaluate(() => document.execCommand('selectall', false, null));
  await fPage.keyboard.type(content);

  await fPage.keyboard.down('ControlLeft');
  await fPage.keyboard.press('Enter');
}

export async function countComments(fPage) {
  try {
    const commentText = await getSpanTextBySubText(fPage, 'Comments');
    return commentText.split(' ')[0];
  } catch (e) {
    console.log('Default comments is 0');
    return 0;
  }
}
export async function countShares(fPage) {
  try {
    const shareText = await getSpanTextBySubText(fPage, 'Share');
    return shareText.split(' ')[0];
  } catch (e) {
    console.log('Default shares is 0');
    return 0;
  }
}

export function getReactionByData(dataParam) {
  return dataParam?.data.node?.top_reactions?.summary?.map((item) => ({
    type: item.reaction.reaction_type,
    value: item.reaction_count,
  }));
}
export async function countReact(fPage) {
  try {
    const dataAPI = getDataByAPI(
      fPage,
      'https://www.facebook.com/api/graphql/',
    );
    await fPage.click('div span[role=toolbar] div[role=button]');

    await fPage.waitForSelector('div[aria-label="Close"]');
    await fPage.click('div[aria-label="Close"]');
    return getReactionByData(await dataAPI);
  } catch (e) {
    console.log(e);
    console.log('Default react is 0');
  }
}
export async function reactPost(fPage, reaction: string): Promise<boolean> {
  try {
    await checkCanReact(fPage);
    await fPage.hover('div[data-visualcompletion="ignore-dynamic"] div[aria-label=Like]');
    // wait show modal
    await fPage.waitForSelector(
      'div[role=dialog][aria-label=Reactions] div[aria-label=Like]',
    );
    await fPage.click(
      `div[role=dialog][aria-label=Reactions] div[aria-label=${reaction}]`,
    );
    await timeWaiting(500);
    return true;
  } catch (e) {
    console.log("Cannot react post");
    throw 'Cannot react post';
  }
}

export async function commentPost(fPage, comment: string): Promise<boolean> {
  try {
    await fPage.checkCanComment(fPage);
    await fPage.click('div[aria-label="Write a comment"]');
    await fPage.keyboard.type(comment);
    await fPage.keyboard.press('Enter');
    // wait show modal
    return true;
  } catch (e) {
    console.log('Cannot comment');
    return false;
  }
}
