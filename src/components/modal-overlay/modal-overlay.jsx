import styles from './modal-overlay.module.css';
import clsx from 'clsx';

import { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getModal } from '../../services/helpers/getSelector';

const ModalOverlay = ({ handleModalClose }) => {
  const { modalIngredient, modalOrder, modalOrderSuccess } = useSelector(getModal)
  const handleEscape = useCallback((e) => (e.key === 'Escape') && handleModalClose(), [handleModalClose])

  const isModalOpen = useMemo(() => !!modalIngredient || !!modalOrder || !!modalOrderSuccess, [modalIngredient, modalOrder, modalOrderSuccess])

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