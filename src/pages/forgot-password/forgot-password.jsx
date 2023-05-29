import clsx from 'clsx';
import styles from './forgot-password.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';

const ForgotPasswordPage = () => {
  return (
    <div className={clsx(styles.container)}>
      <LoginForm type={'forgot'} />
      <LoginLinks type={'forgot'} />
    </div>
  );
};

export default ForgotPasswordPage;