import clsx from 'clsx';
import styles from './header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from '../header-link/header-link.jsx';
import { PATH } from '../../utils/config.js';


const Header = () => {
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
              <HeaderLink text={'Лента заказов'} route={PATH.ORDERS}>
                <ListIcon type="secondary"/>
              </HeaderLink>
            </li>
          </ul>
        </nav>

        <div className={clsx(styles.logo)}>
          <Logo></Logo>
        </div>
        <div className={clsx(styles.profile)}>
          <HeaderLink text={'Личный кабинет'} route={PATH.PROFILE}>
            <ProfileIcon type="secondary"/>
          </HeaderLink>
        </div>
      </div>
    </header>
  );
};


export default Header;