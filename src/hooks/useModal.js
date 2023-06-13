import { useSelector } from 'react-redux';
import { useMemo } from 'react';


export const useModal = () => {
  const { modalIngredient, modalOrder, modalOrderSuccess, modalNotification } = useSelector(store => store.modal);

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