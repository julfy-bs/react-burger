import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api.js';

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