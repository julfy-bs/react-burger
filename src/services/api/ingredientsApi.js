import { serverConfig } from '../../utils/config.js';
import { checkResponse } from '../helpers/checkResponse.js';

const IngredientsApi = ({ baseUrl, headers }) => {

  const getIngredients = async () => checkResponse(await fetch(`${baseUrl}/ingredients`, {
    headers,
  }));

  const postOrder = async (order) => checkResponse(await fetch(`${baseUrl}/orders`, {
    headers,
    method: 'POST',
    body: JSON.stringify(order)
  }));

  return { getIngredients, postOrder };
};

export const { getIngredients, postOrder } = IngredientsApi(serverConfig);