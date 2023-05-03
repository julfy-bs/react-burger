import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  modalIngredient: null,
  isDetailedIngredientOpened: false,
  isDetailedOrderOpened: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalIngredient(state, action) {
      state.modalIngredient = action.payload;
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

export const {
  setModalIngredient,
  openModal,
  closeModal,
} = modalSlice.actions;
export default modalSlice.reducer;