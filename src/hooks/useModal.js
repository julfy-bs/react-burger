import { useState } from 'react';

export const useModal = () => {
  const [isDetailedOrderOpened] = useState(false);

  return {
    isDetailedOrderOpened,
  };
};