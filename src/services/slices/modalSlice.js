import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  modalIngredient: null,
  isDetailedIngredientOpened: false,
  isDetailedOrderOpened: false
}

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setModalIngredient(state, action) {
      state.modalIngredient = action.payload;
    },
    openOrderModal(state) {
      state.isDetailedOrderOpened = true;
    },
    closeOrderModal(state) {
      state.isDetailedOrderOpened = false;
    },
    openModal(state, action) {
      action.payload.type === 'ingredient'
        ? state.isDetailedIngredientOpened = true
        : state.isDetailedOrderOpened = true;
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isDetailedIngredientOpened = false;
      state.isDetailedOrderOpened = false;
      state.isModalOpen = false;
    }
  }
});
const { actions } = modalSlice;
export const { setModalIngredient, openModal, closeModal, openOrderModal, closeOrderModal } = actions;
export default modalSlice.reducer;