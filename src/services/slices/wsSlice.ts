import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types/Order';
import { WebsocketState } from '../../types/WebsocketState';

const initialState: WebsocketState = {
  wsConnected: false,
  orders: null,
  total: 0,
  totalToday: 0
};

const wsSlice = createSlice({
  name: 'wsSlice',
  initialState,
  reducers: {
    wsConnectionStart(_state, _action: PayloadAction<string>) {
      return undefined;
    },
    wsConnectionSuccess(state) {
      state.wsConnected = true;
    },
    wsConnectionFailed(state) {
      state.wsConnected = false;
    },
    wsConnectionClosed(state) {
      state.wsConnected = false;
      state.orders = null;
    },
    wsGetAllOrders(
      state,
      action: PayloadAction<{
        orders: Order[],
        total: number,
        totalToday: number
      }>
    ) {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
  }
});

export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionClosed,
  wsConnectionFailed,
  wsGetAllOrders
} = wsSlice.actions;

export const wsActions = {
  wsInit: wsConnectionStart.type,
  onOpen: wsConnectionSuccess.type,
  onClose: wsConnectionClosed.type,
  onError: wsConnectionFailed.type,
  onMessage: wsGetAllOrders.type,
};
export default wsSlice.reducer;
