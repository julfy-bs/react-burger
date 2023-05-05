import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {
    bun: null,
    ingredients: [],
  },
  ingredientsCounter: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addIngredient(state, action) {
      const ingredientId = action.payload._id;
      const counter = state.ingredientsCounter[ingredientId];
      const isIngredientInCart = Object.keys(state.ingredientsCounter).includes(ingredientId);

      (state.cart.bun !== null
        && action.payload.type === 'bun'
        && state.cart.bun !== action.payload) && delete state.ingredientsCounter[state.cart.bun._id];

      isIngredientInCart
        ? state.ingredientsCounter[action.payload._id] = counter + 1
        : state.ingredientsCounter[action.payload._id] = 1;

      action.payload.type === 'bun'
        ? state.cart.bun = action.payload
        : state.cart.ingredients.push(action.payload);
    },
    removeIngredient(state, action) {
      const ingredientId = action.payload._id;
      const counter = state.ingredientsCounter[ingredientId];
      state.ingredientsCounter[action.payload._id] = counter - 1;

      state.cart.ingredients.splice(action.payload.index, 1);
    },
    sortIngredients(state, action) {
      state.cart.ingredients.splice(action.payload.atIndex, 0, action.payload.ingredient);
    },
    cleanCart(state) {
      state.cart = {
        bun: null,
        ingredients: []
      };
      state.ingredientsCounter = {};
      state.orderIdsArray = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  cleanCart,
  sortIngredients
} = cartSlice.actions;
export default cartSlice.reducer;