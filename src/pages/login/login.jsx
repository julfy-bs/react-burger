import clsx from 'clsx';
import styles from './login.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';

const LoginPage = () => {
  return (
    <div className={clsx(styles.container)}>
      <LoginForm type={'login'} />
      <LoginLinks type={'login'} />
    </div>
  );
};

export default LoginPage;