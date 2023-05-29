import clsx from 'clsx';
import styles from './register.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';

const RegisterPage = () => {
  return (
    <div className={clsx(styles.container)}>
      <LoginForm type={'register'} />
      <LoginLinks type={'register'} />
    </div>
  );
};
export default RegisterPage;