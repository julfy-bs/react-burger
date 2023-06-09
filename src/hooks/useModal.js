import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import {
  setModalIngredient,
  setModalNotification,
  setModalOrder
} from '../services/slices/modalSlice.js';


export const useModal = () => {
  const { modalIngredient, modalOrder, modalNotification } = useSelector(store => store.modal);
  const dispatch = useDispatch();

  const isModalOpen = useMemo(
    () => !!modalIngredient || !!modalOrder,
    [modalIngredient, modalOrder]
  );

  const isNotificationOpen = useMemo(
    () => !!modalNotification,
    [modalNotification]
  );

  const openIngredientModal = useCallback(
    (ingredient) => dispatch(setModalIngredient(ingredient)),
    [dispatch]
  );
  const openOrderModal = useCallback(
    (order) => dispatch(setModalOrder(order)),
    [dispatch]
  );
  const openNotificationModal = useCallback(
    (notification) => dispatch(setModalNotification(notification)),
    [dispatch]
  );

  return {
    openIngredientModal,
    openOrderModal,
    openNotificationModal,
    isModalOpen,
    isNotificationOpen
  };
};