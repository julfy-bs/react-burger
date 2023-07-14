import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../api/ingredientsApi';
import { IngredientsPromise } from '../../types/IngredientsPromise';

type IngredientsError = {
  data: unknown,
  ok: boolean,
  status: number,
  statusText: string,
  success: boolean,
  url: string
}

export const fetchIngredients = createAsyncThunk<
  IngredientsPromise,
  void,
  {
    rejectValue: IngredientsError
  }
>(
  'ingredients/fetchIngredients',
  (_, thunkAPI) =>
    getIngredients()
      .catch(e => {
        const { rejectWithValue } = thunkAPI;
        const hasErrorData = (e as unknown as IngredientsError);
        return rejectWithValue(hasErrorData);
      })
);