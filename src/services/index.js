import { combineReducers,configureStore } from '@reduxjs/toolkit';

import ingredientsSlice from './slices/ingredientsSlice';
import loadingSlice from './slices/loadingSlice.js';
import cartSlice from './slices/cartSlice.js';
import modalSlice from './slices/modalSlice.js';
import orderSlice from './slices/orderSlice.js';
import userSlice from './slices/userSlice.js';
import loginSlice from './slices/loginSlice.js';
import logoutSlice from './slices/logoutSlice.js';
import registerSlice from './slices/registerSlice.js';
import passwordSlice from './slices/passwordSlice.js';
import wsSlice from './slices/wsSlice.js';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  loading: loadingSlice,
  cart: cartSlice,
  modal: modalSlice,
  order: orderSlice,
  user: userSlice,
  login: loginSlice,
  logout: logoutSlice,
  register: registerSlice,
  password: passwordSlice,
  websocket: wsSlice
});

export const store = configureStore({
  reducer: rootReducer,
});