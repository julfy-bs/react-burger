import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api.js';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkApi) => {
    try {
      const res = await api.getIngredients();
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);