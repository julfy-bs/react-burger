import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './modal.module.css';

import ModalOverlay from '../modal-overlay/modal-overlay.jsx';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../services/slices/modalSlice.js';

import { MODAL_ID } from '../../utils/constants.js';
import { useModal } from '../../hooks/useModal.js';

const Modal = ({ info, title, ariaTitle, children }) => {
  const { isModalOpen } = useModal();
  const dispatch = useDispatch();

  return createPortal(
    <>
      {
        <>
          { !info && <ModalOverlay/> }
          <div
            className={clsx(
              styles.modal,
              { [styles.modal_opened]: isModalOpen },
              { [styles.modal_content]: !info },
              { [styles.modal_info]: info }
            )}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby={title ? 'modal-title' : 'aria-title'}
            aria-modal={isModalOpen ? 'true' : 'false'}
          >
            <div className={clsx(styles.modal__header)}>
              {
                title &&
                <h3
                  className={clsx(
                    styles.modal__title,
                    'text',
                    { 'text_type_main-large': !info },
                    { 'text_type_main-default': info },

                  )}
                  id="modal-title">
                  {title}
                </h3>
              }
              {
                !title &&
                <h3 className={clsx(styles.screenReader)} id="aria-title">
                  {ariaTitle}
                </h3>
              }
              <button
                className={clsx(styles.modal__close)}
                aria-label="Закрыть модальное окно"
                type="button"
                onClick={() => dispatch(closeModal())}
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
  info: PropTypes.bool,
  title: PropTypes.string,
  ariaTitle: PropTypes.string,
  children: PropTypes.node
};

Modal.defaultProps = {
  cornered: false
};

export default Modal;