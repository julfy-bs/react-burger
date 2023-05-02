import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from '../asyncThunk/ingredientsThunk.js';

const initialState = {
  ingredients: [],
  ingredientsFetchRequest: false,
  ingredientsFetchFailed: false,
};

const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState,
  reducers: {},
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
      });
  },
});

export default ingredientsSlice.reducer;