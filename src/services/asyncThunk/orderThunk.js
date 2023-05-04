import { createAsyncThunk } from '@reduxjs/toolkit';
import { postOrder } from '../../api/api.js';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (idsArray, thunkApi) => {
    try {
      return await postOrder({ ingredients: idsArray })
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);