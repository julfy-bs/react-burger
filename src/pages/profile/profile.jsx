import clsx from 'clsx';
import styles from './profile.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import ProfileMenu from '../../components/profile-menu/profile-menu.jsx';

const ProfilePage = () => {
  return (
    <section className={clsx(styles.container)}>
      <ProfileMenu />
      <LoginForm type={'profile'} />
    </section>
  );
};

export default ProfilePage;