import { useSelector } from 'react-redux';

export const useModal = () => {
  const { modalIngredient, detailedInformation, isModalOpen, isDetailedOrderOpened, isDetailedIngredientOpened } = useSelector(store => store.modal);

  return { modalIngredient, detailedInformation, isModalOpen, isDetailedOrderOpened, isDetailedIngredientOpened };
};