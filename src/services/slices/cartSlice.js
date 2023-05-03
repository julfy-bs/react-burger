import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {
    bun: null,
    ingredients: []
  },
  cartPrice: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addIngredient(state, action) {
      action.payload.type === 'bun'
        ? state.cart.bun = action.payload
        : state.cart.ingredients.push(action.payload);
    },
    removeIngredient(state, action) {
      state.cart.ingredients.splice(action.payload.index, 1);
    },
    sortIngredients(state, action) {
      state.cart.ingredients.splice(action.payload.atIndex, 0, action.payload.ingredient);
    },
    createIngredient(state, action) {
      state.cart.ingredients.splice(action.payload.atIndex, 0, action.payload.ingredient);
    },
    cleanCart(state) {
      state.cart = {
        bun: null,
        ingredients: []
      };
    },
    summarizeIngredientsCost(state) {
      if (state.cart.bun !== null) {
        const bunPrice = state.cart.bun.price;
        const ingredientsPrice = state.cart.ingredients.reduce((acc, current) => acc + current.price, 0);
        state.cartPrice = bunPrice + ingredientsPrice + bunPrice;
      }
    },
    resetIngredientsCost(state) {
      state.cartPrice = 0;
    }
  }
});

const { actions } = cartSlice;
export const {
  addIngredient,
  removeIngredient,
  summarizeIngredientsCost,
  cleanCart,
  resetIngredientsCost,
  sortIngredients
} = actions;
export default cartSlice.reducer;