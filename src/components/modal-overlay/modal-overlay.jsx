import styles from './modal-overlay.module.css';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../services/slices/modalSlice.js';

const ModalOverlay = () => {
  const { isModalOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const handleEscape = useCallback((e) => (e.key === 'Escape') && dispatch(closeModal()), [dispatch])

  useEffect(() => {
    if (!isModalOpen) return;
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape, isModalOpen]);

  return (
    <div
      tabIndex="1"
      className={
        clsx(
          styles.modal__overlay,
          { [styles.modal__overlay_opened]: isModalOpen }
        )
      }
      onClick={() => dispatch(closeModal())}
    >
    </div>
  );
};

export default ModalOverlay;