import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './notification.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';

import { MODAL_ID } from '../../utils/constants.js';
import { useModal } from '../../hooks/useModal.js';
import { useCallback } from 'react';

const Notification = ({ title, children }) => {
  const { closeAnyModal, isNotificationOpen } = useModal();

  const handleModalClose = useCallback(() => {
    closeAnyModal();
  }, [closeAnyModal]);

  return createPortal(
    <div
      className={clsx(
        styles.notification,
        { [styles.notification_opened]: isNotificationOpen }
      )}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-labelledby={title ? 'modal-title' : 'aria-title'}
      aria-modal={isNotificationOpen ? 'true' : 'false'}
    >
      <div className={clsx(styles.notification__header)}>
        <h3
          className={clsx(styles.notification__title, 'text', 'text_type_main-default')}
          id="modal-title"
        >
          {title}
        </h3>
        <button
          className={clsx(styles.notification__close)}
          aria-label="Закрыть модальное окно"
          type="button"
          onClick={() => handleModalClose()}
        >
          <CloseIcon type="primary"/>
        </button>
      </div>
      {children}
    </div>,
    document.querySelector(MODAL_ID)
  );
};


Notification.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Notification;