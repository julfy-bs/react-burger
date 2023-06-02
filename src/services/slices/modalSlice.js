import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  modalIngredient: null,
  isDetailedIngredientOpened: false,
  isDetailedOrderOpened: false,
  detailedInformation: null,
  isDetailedInformationOpened: false
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
      state.isDetailedInformationOpened = false;
      state.isModalOpen = false;
      state.modalIngredient = null;
      state.detailedInformation = null;
    },
    openModalWithMessage(state, action) {
      state.detailedInformation = action.payload;
      state.isModalOpen = true;
      state.isDetailedInformationOpened = true;
    }
  }
});

export const {
  setModalIngredient,
  openModal,
  closeModal,
  openModalWithMessage
} = modalSlice.actions;
export default modalSlice.reducer;