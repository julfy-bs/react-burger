import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from '../asyncThunk/orderThunk.js';

const initialState = {
  orderNumber: null,
  orderFetchRequest: false,
  orderFetchFailed: false,
  orderIdsArray: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderIdsArray(state, action) {
      const idsArray = [];
      action.payload.ingredients.forEach(item => idsArray.push(item._id));
      idsArray.push(action.payload.bun._id);
      idsArray.push(action.payload.bun._id);
      state.orderIdsArray = idsArray;
    },
    resetOrderIdsArray(state) {
      state.orderIdsArray = [];
    }
  },
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
export const {
  setOrderIdsArray,
  resetOrderIdsArray
} = orderSlice.actions;
export default orderSlice.reducer;