import React, { Component } from 'react';
import headerStyles from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class Header extends Component {

  render() {
    return (
      <header
        className={`${headerStyles.header} text text_type_main-default pt-4 pb-4`}
      >
        <div className={headerStyles.content}>
          <nav>
            <ul className={headerStyles.navigation}>
              <li>
                <a
                  href="/#"
                  className={`${headerStyles.link} ${headerStyles.link_active} pt-4 pr-5 pb-4 pl-5`}
                >
                  <BurgerIcon type="primary"/>
                  <span className={`ml-2`}>Конструктор</span>
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  className={`${headerStyles.link} pt-4 pr-5 pb-4 pl-5`}
                >
                  <ListIcon type="secondary"/>
                  <span className={`ml-2`}>Лента заказов</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className={`${headerStyles.logo}`}>
            <Logo></Logo>
          </div>
          <div className={`${headerStyles.profile}`}>
            <a
              href="/#"
              className={`${headerStyles.link} pt-4 pr-5 pb-4 pl-5`}
            >
              <ProfileIcon type="secondary"/>
              <span className={`ml-2`}>Личный кабинет</span>
            </a>
          </div>
        </div>
      </header>
    );
  }
}


export default Header;