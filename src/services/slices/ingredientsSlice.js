import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkApi) => {
    try{
      const res = await api.getIngredients();
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);


const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState: {
    ingredients: [],
    ingredientsFetchRequest: false,
    ingredientsFetchFailed: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsFetchRequest = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.ingredientsFetchRequest = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsFetchRequest = false;
        state.ingredientsFetchFailed = true;
        console.error(action.payload);
      })
  },
});

export default ingredientsSlice.reducer;