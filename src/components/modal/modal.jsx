import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './modal.module.css';

import ModalOverlay from '../modal-overlay/modal-overlay.jsx';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../services/slices/modalSlice.js';

import { MODAL_ID } from '../../utils/enum.js';

const Modal = ({ title, ariaTitle, children }) => {
  const { isModalOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  return createPortal(
    <>
      {
        <>
          <ModalOverlay/>
          <div
            className={clsx(styles.modal, { [styles.modal_opened]: isModalOpen })}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby={title ? 'modal-title' : 'aria-title'}
            aria-modal={isModalOpen ? 'true' : 'false'}
          >
            <div className={clsx(styles.modal__header)}>
              {
                title &&
                <h3 className={clsx(styles.modal__title, 'text text_type_main-large')} id="modal-title">
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
  title: PropTypes.string,
  ariaTitle: PropTypes.string,
  children: PropTypes.any
};

export default Modal;