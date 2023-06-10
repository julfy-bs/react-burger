import { createAsyncThunk } from '@reduxjs/toolkit';
import { postOrder } from '../api/ingredientsApi.js';
import { closeAllModal, setModalNotification, setModalOrder } from '../slices/modalSlice.js';
import { cleanCart } from '../slices/cartSlice.js';
import { setErrorMessage, setMessage } from '../slices/orderSlice.js';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  (cart, { dispatch, rejectWithValue, getState }) => {
    const bunId = cart.bun._id;
    const ingredientsIdsArray = cart.ingredients.map(item => item._id);
    const idsArray = [bunId, ...ingredientsIdsArray, bunId];
    dispatch(setMessage({ boolean: true }));
    const { order } = getState()
    dispatch(setModalNotification(order.messageContent));
    setTimeout(() => {
        dispatch(setMessage({ boolean: false }));
        dispatch(closeAllModal());
      },
      14000);
    const request = postOrder({ ingredients: idsArray });
    return request
      .then((res) => {
        dispatch(setModalOrder(res));
        dispatch(cleanCart());
        return res;
      })
      .catch((e) => {
        dispatch(setErrorMessage({ boolean: true }));
        const { order } = getState()
        dispatch(setModalNotification(order.errorMessageContent));
        setTimeout(() => {
            dispatch(setErrorMessage({ boolean: false }));
            dispatch(closeAllModal());
          },
          14000);
        return rejectWithValue(e);
      });
  },
);