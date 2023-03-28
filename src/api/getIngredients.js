import { url as baseUrl } from '../utils/enum.js';
const checkResponse = (res) => (res.ok) ? res.json() : Promise.reject(`${res.statusText}${res.status}`);

const getIngredients = (url = '', options = {}) => {
  const computedUrl = `${baseUrl}/${url}`;
  return fetch(computedUrl, options).then(r => checkResponse(r));
}

export {
  getIngredients
}