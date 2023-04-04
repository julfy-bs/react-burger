import { useEffect } from 'react';

export const useModal = (handleClose) => {
  const closeModal = () => handleClose(false);
  const handleEscape = (e) => (e.key === 'Escape') && closeModal();

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return {
    closeModal
  }
};