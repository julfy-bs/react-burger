import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { MODAL_ID } from '../../utils/enum.js';
import { useModal } from '../../hooks/useModal.js';

const Modal = ({ title, children, isOpen, setIsOpen }) => {
  const { closeModal } = useModal(setIsOpen);

  return createPortal(
    <>
      {
        <>
          <ModalOverlay
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <div
            className={clsx(styles.modal, { [styles.modal_opened]: isOpen })}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal={isOpen ? 'true' : 'false'}
          >
            <div className={clsx(styles.modal__header)}>
              <h3 className={clsx(styles.modal__title, 'text text_type_main-large')} id="modal-title">
                {title}
              </h3>
              <button
                className={clsx(styles.modal__close)}
                aria-label="Закрыть модальное окно"
                type="button"
                onClick={closeModal}
              >
                <CloseIcon type="primary"/>
              </button>
            </div>
            {children}
          </div>
        </>
      }
    </>,
    document.querySelector(MODAL_ID)
  );
};


Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired
};

export default Modal;