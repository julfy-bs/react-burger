import clsx from 'clsx';
import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu.jsx';
import { Outlet } from 'react-router-dom';
import Loader from '../../components/loader/loader.jsx';
import { useSelector } from 'react-redux';

const ProfileLayout = () => {
  const { isLogin } = useSelector(store => store.user.user);

  return (
    isLogin
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
      : (<Loader loading={!isLogin} />)

  );
};

export default ProfileLayout;