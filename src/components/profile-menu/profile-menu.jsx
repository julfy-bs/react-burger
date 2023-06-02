import clsx from 'clsx';
import styles from './profile-menu.module.css';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../utils/config.js';

const ProfileMenu = () => {
  return (
    <>
      <nav>
        <ul className={clsx('page__list', styles.list)}>
          <li className={clsx(styles.item)}>
            <NavLink
              end
              to={PATH.PROFILE}
              className={({ isActive }) =>
                clsx(isActive ? styles.link_active : styles.link, 'page__link', 'text', 'text_type_main-medium')}
            >
              Профиль
            </NavLink>
          </li>
          <li className={clsx(styles.item)}>
            <NavLink
              end
              to={PATH.ORDERS}
              className={({ isActive }) =>
                clsx(isActive ? styles.link_active : styles.link, 'page__link', 'text', 'text_type_main-medium')}
            >
              История заказов
            </NavLink>
          </li>
          <li className={clsx(styles.item)}>
            <NavLink
              to={PATH.LOGOUT}
              className={clsx(styles.link, 'page__link', 'text', 'text_type_main-medium')}
            >
              Выход
            </NavLink>
          </li>
        </ul>

      </nav>
    </>
  );
};

export default ProfileMenu;