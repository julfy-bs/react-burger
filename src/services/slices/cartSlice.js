import { createSlice, createAction } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    orderNumber: null,
    cart: [],
    cartPrice: 0
  },
  reducers: {
    addIngredient(state, action) {
      if (action.payload.type === 'bun') {
        state.cart.bun = action.payload.value
      } else {
        state.cart.ingredients.push(action.payload.value)
      }
    },
    removeIngredient(state, action) {
      if (action.payload.type === 'bun') {
        state.cart.bun = null
      } else {
        state.cart.ingredients.push(action.payload.value)
      }
    }
  }
});

const { actions } = cartSlice
export const { addIngredient, removeIngredient } = actions
export default cartSlice.reducer;