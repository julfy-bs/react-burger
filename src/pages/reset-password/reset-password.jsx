import clsx from 'clsx';
import styles from './reset-password.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';

const ResetPasswordPage = () => {
  return (
    <div className={clsx(styles.container)}>
      <LoginForm type={'reset'} />
      <LoginLinks type={'reset'} />
    </div>
  );
};

export default ResetPasswordPage;