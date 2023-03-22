import React, { Component } from 'react';
import headerStyles from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import HeaderLink from '../header-link/header-link.jsx';

class Header extends Component {

  render() {
    return (
      <header
        className={
          clsx(headerStyles.header, 'text', 'text_type_main-default', 'pt-4', 'pb-4')
        }
      >
        <div className={clsx(headerStyles.content)}>
          <nav>
            <ul className={clsx(headerStyles.navigation)}>
              <li>
                <HeaderLink text={'Конструктор'} active={true}>
                  <BurgerIcon type="primary"/>
                </HeaderLink>
              </li>
              <li>
                <HeaderLink text={'Лента заказов'}>
                  <ListIcon type="secondary"/>
                </HeaderLink>
              </li>
            </ul>
          </nav>

          <div className={clsx(headerStyles.logo)}>
            <Logo></Logo>
          </div>
          <div className={clsx(headerStyles.profile)}>
            <HeaderLink text={'Лента заказов'}>
              <ProfileIcon type="secondary"/>
            </HeaderLink>
          </div>
        </div>
      </header>
    );
  }
}


export default Header;