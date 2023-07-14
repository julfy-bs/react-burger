import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/Ingredient';
import { Order } from '../../types/Order';
import { OrderPromise } from '../../types/OrderPromise';

export type ModalState = {
  modalIngredient: Ingredient | null;
  modalOrder: Order | null;
  modalNotification: string | null;
  modalOrderSuccess: OrderPromise | null;
}

const initialState: ModalState = {
  modalIngredient: null,
  modalOrder: null,
  modalNotification: null,
  modalOrderSuccess: null
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalIngredient(
      state,
      action: PayloadAction<Ingredient>
    ) {
      state.modalIngredient = action.payload;
    },
    setModalOrder(
      state,
      action: PayloadAction<Order>
    ) {
      state.modalOrder = action.payload;
    },
    setModalNotification(
      state,
      action: PayloadAction<string>
    ) {
      state.modalNotification = action.payload;
    },
    setModalOrderSuccess(
      state,
      action: PayloadAction<OrderPromise>
    ) {
      state.modalOrderSuccess = action.payload;
    },
    closeAllModal(state) {
      state.modalOrder = null;
      state.modalIngredient = null;
      state.modalNotification = null;
      state.modalOrderSuccess = null;
    }
  }
});

export const {
  setModalIngredient,
  setModalOrder,
  setModalNotification,
  setModalOrderSuccess,
  closeAllModal,
} = modalSlice.actions;
export default modalSlice.reducer;