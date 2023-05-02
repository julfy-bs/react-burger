import { combineReducers,configureStore } from '@reduxjs/toolkit';

import ingredientsSlice from './slices/ingredientsSlice';
import loadingSlice from './slices/loadingSlice.js';
import errorSlice from './slices/errorSlice.js';
import cartSlice from './slices/cartSlice.js';
import modalSlice from './slices/modalSlice.js';
import orderSlice from './slices/orderSlice.js';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  loading: loadingSlice,
  error: errorSlice,
  cart: cartSlice,
  modal: modalSlice,
  order: orderSlice
});

export const store = configureStore({
  reducer: rootReducer,
});