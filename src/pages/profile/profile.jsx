import clsx from 'clsx';
import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu.jsx';
import { Outlet } from 'react-router-dom';
import { useAuthorization } from '../../hooks/useAuthorization.js';
import Loader from '../../components/loader/loader.jsx';

const ProfileLayout = () => {
  const { isUserLoggedIn } = useAuthorization();

  return (
    isUserLoggedIn
      ? (
        <div className={clsx(styles.container)}>
          <aside className={clsx(styles.aside)}>
            <ProfileMenu/>
            <p className={clsx('text', 'text_type_main-default', 'text_color_inactive')}>
              В этом разделе вы можете
              изменить свои персональные данные
            </p>
          </aside>
          <section>
            <Outlet/>
          </section>
        </div>
      )
      : (<Loader loading={!isUserLoggedIn} />)

  );
};

export default ProfileLayout;