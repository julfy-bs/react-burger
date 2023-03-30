import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import { useEffect, useState } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ title, children, open = false }) => {
  const [isOpened, setOpen] = useState(open);

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    })
  })

  return (
    <>
      {
        <ModalOverlay opened={isOpened}>
          <div
            className={clsx(styles.modal, { [styles.modal_opened]: isOpened })}
            role="dialog"
            aria-labelledby="edit-profile-form-title"
            aria-modal="true"
          >
            <div className={clsx(styles.modal__header)}>
              <h3 className={clsx(styles.modal__title, 'text text_type_main-large')}>{title}</h3>
              <button
                className={clsx(styles.modal__close, 'ml-9')}
                aria-label="Закрыть попап"
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
    </>
  );
};


Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  open: PropTypes.bool,
};

export default Modal;