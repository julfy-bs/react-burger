import clsx from 'clsx';
import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu.jsx';
import { Outlet } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <section className={clsx(styles.container)}>
      <ProfileMenu/>
      <Outlet />
    </section>
  );
};

export default ProfilePage;