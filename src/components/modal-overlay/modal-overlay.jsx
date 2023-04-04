import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const ModalOverlay = ({ isOpen, setIsOpen }) => {

  return (
    <div
      className={
        clsx(
          styles.modal__overlay,
          { [styles.modal__overlay_opened]: isOpen }
        )
      }
      onClick={() => setIsOpen(false)}
    >
    </div>
  );
};

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired
};

export default ModalOverlay;