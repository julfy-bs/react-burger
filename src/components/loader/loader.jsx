import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './loader.module.css';

const Loader = ({ loading }) => {
  return (
    <div className={clsx(styles.loader, {[styles.loader_active]: loading})}>
      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>
      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>
      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>
      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>
      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>
    </div>
  );
};


Loader.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Loader;