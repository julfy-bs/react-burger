import { request } from '../helpers/request';
import { OrderPromise } from '../../types/OrderPromise';
import { GetOrdersPromise } from '../../types/GetOrdersPromise';

export const postOrder = ({ ingredients }: { ingredients: string[] }): Promise<OrderPromise> =>
  request('orders', {
    method: 'POST',
    body: JSON.stringify({ ingredients })
  });
export const getOrder = ({ orderNumber }: { orderNumber: number }): Promise<GetOrdersPromise> =>
  request(`orders/${orderNumber}`);