import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from '../asyncThunk/orderThunk.js';
import { ERROR_DEFAULT, NOTIFICATION_ORDER_PENDING } from '../../utils/constants.js';

const initialState = {
  order: null,
  orderNumber: null,
  fetch: false,
  error: false,
  message: false,
  messageContent: NOTIFICATION_ORDER_PENDING,
  errorMessage: false,
  errorMessageContent: ERROR_DEFAULT
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setMessage(state, action) {
      const { boolean } = action.payload;
      state.message = boolean;
    },
    setErrorMessage(state, action) {
      const { boolean } = action.payload;
      state.errorMessage = boolean;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.fetch = true;
        state.error = false;
        state.message = false;
        state.errorMessage = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const { order } = action.payload
        const { number } = order;
        state.order = order;
        state.orderNumber = number.toString();
        state.fetch = false;
        state.message = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.log(action);
        if (!!action.payload.data) {
          state.errorMessage = true;
          state.errorMessageContent = action.payload.data.message;
        }
        state.fetch = false;
        state.error = true;
      });
  },
});
export const { setMessage, setErrorMessage } = orderSlice.actions;

export default orderSlice.reducer;