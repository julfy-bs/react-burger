import clsx from 'clsx';
import styles from './header-link.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../utils/config.js';

const HeaderLink = ({ text, route, children }) => {
  return (
    <NavLink
      end
      to={route}
      className={
        ({ isActive }) => clsx(styles.link, isActive ? styles.link_active : '', 'pt-4', 'pr-5', 'pb-4', 'pl-5')
      }
    >
      {children}
      <span className={clsx('ml-2')}>{text}</span>
    </NavLink>
  );
};


HeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.oneOf([PATH.HOME, PATH.PROFILE, PATH.ORDERS]).isRequired,
  children: PropTypes.any
};

HeaderLink.defaultProps = {
  active: false
};

export default HeaderLink;