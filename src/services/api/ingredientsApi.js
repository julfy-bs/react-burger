import { request } from '../helpers/request.js';

export const getIngredients = () => request('ingredients');
export const postOrder = (order) => request('orders', {
  method: 'POST',
  body: JSON.stringify(order)
});