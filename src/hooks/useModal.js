import { useEffect, useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setModalState] = useState(false);
  const [detailedIngredient, setDetailedIngredient] = useState(null);
  const [isDetailedOrderOpened, setIsDetailedOrderOpened] = useState(false);

  const closeModal = () => {
    if (isDetailedOrderOpened) setIsDetailedOrderOpened(false);
    if (detailedIngredient !== null) setDetailedIngredient(null);
    setModalState(false);
  };

  const openModal = (type, value) => {
    if (type === 'ingredient') {
      setDetailedIngredient(value);
      setModalState(true);
    }
    if (type === 'cart') {
      setIsDetailedOrderOpened(value);
      setModalState(true);
    }
  };

  const handleEscape = (e) => (e.key === 'Escape') && closeModal();

  useEffect(() => {
    if (!isModalOpen) return;
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return {
    handleEscape,
    closeModal,
    openModal,
    isModalOpen,
    detailedIngredient,
    isDetailedOrderOpened,
  };
};