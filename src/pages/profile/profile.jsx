import clsx from 'clsx';
import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import Loader from '../../components/loader/loader.jsx';
import { useSelector } from 'react-redux';
import { PATH } from '../../utils/config.js';
import { getUser } from '../../services/helpers/getSelector';

const ProfileLayout = () => {
  const { user } = useSelector(getUser);
  const location = useLocation();

  return (
    user.isLogin
      ? (
        <div className={clsx(styles.container)}>
          <aside className={clsx(styles.aside)}>
            <ProfileMenu/>
            <>
              {
                location.pathname === PATH.PROFILE && (
                  <p className={clsx('text', 'text_type_main-default', 'text_color_inactive')}>
                    В&nbsp;этом&nbsp;разделе вы можете изменить свои&nbsp;персональные&nbsp;данные
                  </p>
                )
              }
              {
                location.pathname === PATH.ORDERS && (
                  <p className={clsx('text', 'text_type_main-default', 'text_color_inactive')}>
                    В&nbsp;этом&nbsp;разделе вы можете просмотреть свою&nbsp;историю&nbsp;заказов
                  </p>
                )
              }
            </>
          </aside>
          <section className={clsx(styles.section)}>
            <Outlet/>
          </section>
        </div>
      )
      : (<Loader />)

  );
};

export default ProfileLayout;