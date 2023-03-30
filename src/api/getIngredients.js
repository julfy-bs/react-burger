import { serverConfig } from '../utils/config.js';

const Api = (baseUrl, headers) => {
  const checkResponse = (res) => (res.ok) ? res.json() : Promise.reject(JSON.parse(JSON.stringify(res.json())))

  const request = async (url, options = {}) => {
    const computedUrl = `${baseUrl}/${url}`;
    const res = await fetch(computedUrl, {
      headers: headers,
      ...options,
    });
    return checkResponse(res);
  };

  const getIngredients = () => {
    return request('ingredients');
  };

  const createOrder = () => {
    return 345436;
  };

  return { getIngredients, createOrder };
};

export const api = Api(serverConfig.baseUrl, serverConfig.headers);