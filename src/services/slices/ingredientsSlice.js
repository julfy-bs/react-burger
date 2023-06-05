import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from '../asyncThunk/ingredientsThunk.js';

const initialState = {
  ingredients: [],
  ingredientsFetchRequest: false,
  ingredientsFetchFailed: false,
  ingredientsNotification: '',
  ingredientsError: ''
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsFetchRequest = true;
        state.ingredientsFetchFailed = false;
        state.ingredientsNotification = '';
        state.ingredientsError =  '';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.ingredientsFetchRequest = false;
        state.ingredientsNotification = '';
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsFetchRequest = false;
        state.ingredientsFetchFailed = true;
        state.ingredientsError =  action.payload;
      });
  },
});

export default ingredientsSlice.reducer;