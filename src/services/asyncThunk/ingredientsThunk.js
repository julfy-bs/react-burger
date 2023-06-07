import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../api/ingredientsApi.js';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => await getIngredients(),
);