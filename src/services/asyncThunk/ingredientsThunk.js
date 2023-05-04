import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../../api/api.js';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkApi) => {
    try {
      const res = await getIngredients();
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);