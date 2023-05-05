import { createAsyncThunk } from '@reduxjs/toolkit';
import { postOrder } from '../../api/api.js';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (cart, thunkApi) => {
    try {
      const bunId = cart.bun._id;
      const ingredientsIdsArray = cart.ingredients.map(item => item._id);
      const idsArray = [bunId, ...ingredientsIdsArray, bunId];
      return await postOrder({ ingredients: idsArray })
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);