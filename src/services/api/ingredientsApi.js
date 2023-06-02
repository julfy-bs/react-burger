import { serverConfig } from '../../utils/config.js';
import checkResponse from '../helpers/checkResponse.js';

const IngredientsApi = ({ baseUrl, headers }) => {

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

  const postOrder = (order) => {
    return request('orders', {
      method: 'POST',
      body: JSON.stringify(order)
    });
  };

  return { getIngredients, postOrder };
};

export const { getIngredients, postOrder } = IngredientsApi(serverConfig);