import { combineReducers,configureStore } from '@reduxjs/toolkit';

import ingredientsSlice from './slices/ingredientsSlice';
import loadingSlice from './slices/loadingSlice.js';
import cartSlice from './slices/cartSlice.js';
import modalSlice from './slices/modalSlice.js';
import orderSlice from './slices/orderSlice.js';
import profileSlice from './slices/profileSlice.js';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  loading: loadingSlice,
  cart: cartSlice,
  modal: modalSlice,
  order: orderSlice,
  profile: profileSlice
});

export const store = configureStore({
  reducer: rootReducer,
});