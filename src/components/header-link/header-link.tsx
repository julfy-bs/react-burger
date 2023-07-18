import clsx from 'clsx';
import styles from './header-link.module.css';
import { NavLink } from 'react-router-dom';
import { MouseEventHandler, ReactNode } from 'react';

type Props = {
  text: string;
  route: string;
  children?: ReactNode;
  onClick?: MouseEventHandler;
}

const HeaderLink = ({ text, route, children, onClick }: Props) => {
  return (
    <NavLink
      to={route}
      className={
        ({ isActive }) => clsx(styles.link, isActive ? styles.link_active : '', 'pt-4', 'pr-5', 'pb-4', 'pl-5')
      }
      onClick={onClick}
    >
      {children}
      <span className={clsx('ml-2')}>{text}</span>
    </NavLink>
  );
};

export default HeaderLink;