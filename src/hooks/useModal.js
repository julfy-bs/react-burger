import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { getModal } from '../services/helpers/getSelector.js';


export const useModal = () => {
  const { modalIngredient, modalOrder, modalOrderSuccess, modalNotification } = useSelector(getModal);

  const isModalOpen = useMemo(
    () => !!modalIngredient || !!modalOrder || !!modalOrderSuccess,
    [modalIngredient, modalOrder, modalOrderSuccess]
  );

  const isNotificationOpen = useMemo(
    () => !!modalNotification,
    [modalNotification]
  );
  return {
    isModalOpen,
    isNotificationOpen
  };
};