import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalIngredient: null,
  modalOrder: null,
  modalNotification: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalIngredient(state, action) {
      state.modalIngredient = action.payload;
    },
    setModalOrder(state, action) {
      state.modalOrder = action.payload;
    },
    setModalNotification(state, action) {
      state.modalNotification = action.payload;
    },
    closeAllModal(state) {
      state.modalOrder = null;
      state.modalIngredient = null;
      state.modalNotification = null;
    }
  }
});

export const {
  setModalIngredient,
  setModalOrder,
  setModalNotification,
  closeAllModal,
} = modalSlice.actions;
export default modalSlice.reducer;