import { createSlice } from '@reduxjs/toolkit';

const wsSlice = createSlice({
  name: 'wsSlice',
  initialState: {
    wsConnected: false,
    orders: null,
    total: 0,
    totalToday: 0
  },
  reducers: {
    wsConnectionStart() {
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
    },
    wsGetAllOrders(state, action) {
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
