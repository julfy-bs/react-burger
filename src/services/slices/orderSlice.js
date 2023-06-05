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
        state.orderFetchFailed = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const { number } = action.payload.order
        state.orderNumber = number.toString();
        state.orderFetchRequest = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderFetchRequest = false;
        state.orderFetchFailed = true;
      });
  },
});
export default orderSlice.reducer;