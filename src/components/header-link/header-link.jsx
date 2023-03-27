import clsx from 'clsx';
import styles from './header-link.module.css';
import PropTypes from 'prop-types';

const HeaderLink = (props) => {
  return (
    <a href="/#"
       className={
         clsx(styles.link, props.active && styles.link_active, 'pt-4', 'pr-5', 'pb-4', 'pl-5')
       }
    >
      {props.children}
      <span className={clsx('ml-2')}>{props.text}</span>
    </a>
  );
}


HeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool
};

HeaderLink.defaultProps = {
  active: false
};

export default HeaderLink;