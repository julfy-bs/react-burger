import clsx from 'clsx';
import styles from './header-link.module.css';
import PropTypes from 'prop-types';

const HeaderLink = ({ text, active, children }) => {
  return (
    <a href="/#"
       className={
         clsx(styles.link, active && styles.link_active, 'pt-4', 'pr-5', 'pb-4', 'pl-5')
       }
    >
      {children}
      <span className={clsx('ml-2')}>{text}</span>
    </a>
  );
}


HeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.any
};

HeaderLink.defaultProps = {
  active: false
};

export default HeaderLink;