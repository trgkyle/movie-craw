function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export async function timeWaiting(ms) {
  return 100;
  let msRamdom;
  switch (ms) {
    case 'short':
      msRamdom = getRandomInt(1000, 2000);
      break;
    case 'normal':
      msRamdom = getRandomInt(2000, 4000);
      break;
    case 'long':
      msRamdom = getRandomInt(5000, 8000);
      break;
    default:
      return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return new Promise((resolve) => setTimeout(resolve, msRamdom));
}
export const facebookReacts = {
  like: 'Like',
  unLike: 'Remove Like',

  love: 'Love',
  unLove: 'Remove Love',

  care: 'Care',
  unCare: 'Remove Care',

  haha: 'Haha',
  unHaha: 'Remove Haha',

  sad: 'Sad',
  unSad: 'Remove Sad',

  angry: 'Angry',
  unAngry: 'Remove Angry',
};
