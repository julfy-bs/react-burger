import clsx from 'clsx';
import styles from './profile-menu.module.css';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../utils/config.js';
import { useEffect } from 'react';
import { useAuthorization } from '../../hooks/useAuthorization.js';
import { useFetch } from '../../hooks/useFetch.js';
import { useSelector } from 'react-redux';
import { useLogout } from '../../hooks/useLogout.js';

const ProfileMenu = () => {
  const { handleProtectedRoute } = useAuthorization();
  const { handleFulfilledFetch, handleRejectedFetch } = useFetch();
  const { handleLogout } = useLogout();
  const { message, profileFetchRequest, profileFetchFailed, errorMessage } = useSelector(store => store.profile);

  useEffect(() => {
    handleFulfilledFetch({
      fetchStatus: profileFetchRequest,
      fetchError: profileFetchFailed,
      message: message,
      handleFulfilledFetch: () => handleProtectedRoute(PATH.LOGIN)
    });
    handleRejectedFetch({
      fetchStatus: profileFetchRequest,
      fetchError: profileFetchFailed,
      errorMessage: errorMessage
    });
  }, [errorMessage, handleFulfilledFetch, handleRejectedFetch, handleProtectedRoute, message, profileFetchFailed, profileFetchRequest]);

  return (
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
          <button
            onClick={handleLogout}
            className={clsx(styles.link, styles.button, 'page__link', 'text', 'text_type_main-medium')}
          >
            Выход
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileMenu;