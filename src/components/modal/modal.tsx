import clsx from 'clsx';
import styles from './modal.module.css';

import ModalOverlay from '../modal-overlay/modal-overlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';

import { MODAL_ID } from '../../utils/constants';
import { ReactNode } from 'react';

type Props = {
  title: string;
  ariaTitle: string;
  children?: ReactNode;
  handleModalClose: () => void;
  isModalOpen: boolean;
}

const Modal = ({ title, ariaTitle, children, handleModalClose, isModalOpen }: Props) => {

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
                onClick={handleModalClose}
              >
                <CloseIcon type="primary"/>
              </button>
            </div>
            {children}
          </div>
        </>
      }
    </>,
    document.querySelector(MODAL_ID) as HTMLDivElement
  );
};

export default Modal;