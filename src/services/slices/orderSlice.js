import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/api.js';

const initialState = {
  orderNumber: null,
  orderFetchRequest: false,
  orderFetchFailed: false,
  orderIdsArray: []
};
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (idsArray, thunkApi) => {
    try {
      return await api.createOrder({ ingredients: idsArray });
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);

const orderSlice = createSlice({
  name: 'orderSlice',
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
const { actions } = orderSlice;
export const { setOrderIdsArray, resetOrderIdsArray } = actions;
export default orderSlice.reducer;