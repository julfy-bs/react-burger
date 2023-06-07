import { createAsyncThunk } from '@reduxjs/toolkit';
import { postOrder } from '../api/ingredientsApi.js';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (cart) => {
    const bunId = cart.bun._id;
    const ingredientsIdsArray = cart.ingredients.map(item => item._id);
    const idsArray = [bunId, ...ingredientsIdsArray, bunId];
    return await postOrder({ ingredients: idsArray })
  },
);