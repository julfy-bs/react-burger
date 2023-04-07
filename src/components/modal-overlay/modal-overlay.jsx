import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import React from 'react';

const ModalOverlay = ({ isModalOpen, closeModal }) => {
  return (
    <div
      tabIndex="1"
      className={
        clsx(
          styles.modal__overlay,
          { [styles.modal__overlay_opened]: isModalOpen }
        )
      }
      onClick={() => closeModal()}
    >
    </div>
  );
};

ModalOverlay.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;