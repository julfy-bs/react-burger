import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOrder } from '../asyncThunk/orderThunk';
import { ERROR_DEFAULT, NOTIFICATION_ORDER_PENDING } from '../../utils/constants.js';
import { Order } from '../../types/Order';
import { State } from '../../types/State';

export type OrderState = {
  order: Order | null,
  orderNumber: string | null,
}

const initialState: OrderState & State = {
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
    setMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.message = action.payload;
    },
    setErrorMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.errorMessage = action.payload;
    },
    setOrder(
      state,
      action: PayloadAction<Order>
    ) {
      state.order = action.payload;
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
        const { order } = action.payload;
        const { number } = order;
        state.order = order;
        state.orderNumber = number.toString();
        state.fetch = false;
        state.message = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        if (action.payload?.message) {
          state.errorMessage = true;
          state.errorMessageContent = action.payload.message;
        }
        state.fetch = false;
        state.error = true;
      });
  },
});
export const { setMessage, setErrorMessage, setOrder } = orderSlice.actions;

export default orderSlice.reducer;