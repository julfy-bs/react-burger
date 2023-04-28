import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState: {
    isModalOpen: false,
    modalIngredient: null,
  },
  reducers: {
    openModal(state, action) {
      state.modalIngredient = action.payload;
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.modalIngredient = null;
      state.isModalOpen = false;
    }
  }
});
const { actions } = modalSlice;
export const { openModal, closeModal } = actions;
export default modalSlice.reducer;