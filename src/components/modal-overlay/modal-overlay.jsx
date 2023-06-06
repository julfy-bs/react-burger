import styles from './modal-overlay.module.css';
import clsx from 'clsx';

import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useModal } from '../../hooks/useModal.js';

const ModalOverlay = ({ handleModalClose }) => {
  const { isModalOpen } = useModal();

  const handleEscape = useCallback((e) => (e.key === 'Escape') && handleModalClose(), [handleModalClose])

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
      onClick={() => handleModalClose()}
    >
    </div>
  );
};

ModalOverlay.propTypes = {
  handleModalClose: PropTypes.func.isRequired
};

export default ModalOverlay;