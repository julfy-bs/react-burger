import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { MODAL_ID } from '../../utils/enum.js';

const Modal = ({ title, children, isOpen, setOpen }) => {

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    })
  })

  return createPortal(
    <>
      {
        <ModalOverlay opened={isOpen} setOpen={setOpen}>
          <div
            className={clsx(styles.modal, { [styles.modal_opened]: isOpen })}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby='modal-title'
            aria-modal={isOpen ? 'true' : 'false'}
          >
            <div className={clsx(styles.modal__header)}>
              <h3 className={clsx(styles.modal__title, 'text text_type_main-large')} id="modal-title">
                {title}
              </h3>
              <button
                className={clsx(styles.modal__close, 'ml-9')}
                aria-label="Закрыть модальное окно"
                type="button"
                onClick={closeModal}
              >
                <CloseIcon type="primary" />
              </button>
            </div>
            {children}
          </div>
        </ModalOverlay>
      }
    </>,
    document.querySelector(MODAL_ID)
  );
};


Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  isOpen: PropTypes.bool,
};

export default Modal;