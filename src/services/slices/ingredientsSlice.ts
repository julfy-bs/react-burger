import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from '../asyncThunk/ingredientsThunk';
import { Ingredient } from '../../types/Ingredient';

export type IngredientsState = {
  ingredients: Ingredient[],
  ingredientsFetchRequest: boolean;
  ingredientsFetchFailed: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  ingredientsFetchRequest: false,
  ingredientsFetchFailed: false,
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
      })
      .addCase(fetchIngredients.fulfilled,
        (
          state,
          action
        ) => {
          const { data } = action.payload;
          state.ingredients = data;
          state.ingredientsFetchRequest = false;
        })
      .addCase(fetchIngredients.rejected, (state) => {
        state.ingredientsFetchRequest = false;
        state.ingredientsFetchFailed = true;
      });
  }
});

export default ingredientsSlice.reducer;