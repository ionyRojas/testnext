import md5 from 'md5';

const PUBLIC_KEY: string =
  process.env.PUBLIC_KEY || 'ed8e1258402398380c4c6b77ca41cb57';
const PRIVATE_KEY: string =
  process.env.PRIVATE_KEY || 'e501eae816677c3301404b7d0483229fc6d8e0e4';
const TS = '1';
const BASE_URL = 'https://gateway.marvel.com/v1/public/';
const MD5 = md5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`);

export const COMICS_URL = `${BASE_URL}comics?apikey=${PUBLIC_KEY}&hash=${MD5}&ts=${TS}&limit=51`;
