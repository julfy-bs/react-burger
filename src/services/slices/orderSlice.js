import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from '../asyncThunk/orderThunk.js';

const initialState = {
  orderNumber: null,
  orderFetchRequest: false,
  orderFetchFailed: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderFetchRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.number.toString();
        state.orderFetchRequest = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderFetchRequest = false;
        state.orderFetchFailed = true;
        console.error(action.payload);
      });
  },
});
export default orderSlice.reducer;