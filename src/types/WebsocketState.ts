import { Order } from './Order';

export type WebsocketState = {
  wsConnected: boolean;
  orders: Order[] | null;
  total: number;
  totalToday: number;
}