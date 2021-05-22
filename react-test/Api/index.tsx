import axios from 'axios';
import { COMICS_URL } from '@constants/urls';

export function getComics() {
  return axios
    .get(COMICS_URL)
    .then(res => [null, res?.data])
    .catch(err => [err]);
}
