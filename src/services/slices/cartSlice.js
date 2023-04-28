import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    orderNumber: null,
    cart: {
      bun: null,
      ingredients: []
    },
    cartPrice: 0
  },
  reducers: {
    addIngredient(state, action) {
      action.payload.type === 'bun'
        ? state.cart.bun = action.payload
        : state.cart.ingredients.push(action.payload);
    },
    removeIngredient(state, action) {
      state.cart.ingredients.splice(action.payload, 1);
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
  resetIngredientsCost
} = actions;
export default cartSlice.reducer;