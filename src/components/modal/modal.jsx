import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './modal.module.css';

import ModalOverlay from '../modal-overlay/modal-overlay.jsx';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';

import { MODAL_ID } from '../../utils/constants.js';
import { useModal } from '../../hooks/useModal.js';
import { useCallback } from 'react';
import { useAuthorization } from '../../hooks/useAuthorization.js';
import { useNavigate } from 'react-router-dom';

const Modal = ({ title, ariaTitle, children }) => {
  const { modalIngredient, modalOrder, closeAnyModal, isModalOpen } = useModal();
  const { previousUrl } = useAuthorization();
  const navigate = useNavigate();

  const handleModalClose = useCallback(() => {
    closeAnyModal();
    (modalIngredient || modalOrder) &&
    navigate(previousUrl, {
      replace: true,
      state: { background: null }
    });
  }, [closeAnyModal, modalIngredient, modalOrder, navigate, previousUrl]);

  return createPortal(
    <>
      {
        <>
          <ModalOverlay handleModalClose={handleModalClose}/>
          <div
            className={clsx(
              styles.modal,
              { [styles.modal_opened]: isModalOpen },
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
                    'text_type_main-large'
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
                onClick={() => handleModalClose()}
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
  children: PropTypes.node
};

export default Modal;