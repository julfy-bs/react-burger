import clsx from 'clsx';
import styles from './header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from '../header-link/header-link.jsx';
import { PATH } from '../../utils/config.js';
import { NavLink } from 'react-router-dom';
import { updateUser } from '../../services/slices/userSlice.js';
import { useDispatch } from 'react-redux';


const Header = () => {
  const dispatch = useDispatch();

  const handleOpenProfile = () => {
    dispatch(updateUser({ isLogout: false }))
  };

  return (
    <header
      className={
        clsx(styles.header, 'text', 'text_type_main-default', 'pt-4', 'pb-4')
      }
    >
      <div className={clsx(styles.content)}>
        <nav>
          <ul className={clsx(styles.navigation)}>
            <li>
              <HeaderLink text={'Конструктор'} route={PATH.HOME}>
                <BurgerIcon type="primary"/>
              </HeaderLink>
            </li>
            <li>
              <HeaderLink text={'Лента заказов'} route={PATH.FEED}>
                <ListIcon type="secondary"/>
              </HeaderLink>
            </li>
          </ul>
        </nav>

        <NavLink to={PATH.HOME} className={clsx(styles.logo)}>
          <Logo></Logo>
        </NavLink>
        <div className={clsx(styles.profile)}>
          <HeaderLink text={'Личный кабинет'} route={PATH.PROFILE} onClick={() => handleOpenProfile()}>
            <ProfileIcon type="secondary"/>
          </HeaderLink>
        </div>
      </div>
    </header>
  );
};


export default Header;