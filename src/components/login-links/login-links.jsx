import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './login-links.module.css';
import { Link } from 'react-router-dom';
import { PATH } from '../../utils/config.js';

const LoginLinks = ({ type }) => {

  const determineType = () => {
    switch (type) {
      case 'login':
        return (
          <>
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text)}>Вы — новый пользователь?</span>
              <Link className={clsx(styles.app_link)} to={PATH.REGISTER}>Зарегистрироваться</Link>
            </li>
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text)}>Забыли пароль?</span>
              <Link className={clsx(styles.app_link)} to={PATH.FORGOT_PASSWORD}>Восстановить пароль</Link>
            </li>
          </>
        );
      case 'register':
        return (
          <>
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text)}>Уже зарегистрированы?</span>
              <Link className={clsx(styles.app_link)} to={PATH.LOGIN}>Войти</Link>
            </li>
          </>
        );
      case 'forgot':
        return (
          <>
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text)}>Вспомнили пароль?</span>
              <Link className={clsx(styles.app_link)} to={PATH.LOGIN}>Войти</Link>
            </li>
          </>
        );
      case 'reset':
        return (
          <>
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text)}>Вспомнили пароль?</span>
              <Link className={clsx(styles.app_link)} to={PATH.LOGIN}>Войти</Link>
            </li>
          </>
        );
      default:
        return (<h1>unknown type</h1>);
    }
  };

  return (
    <ul className={clsx('page__list', styles.list)}>
      {determineType()}
    </ul>
  );
};


LoginLinks.propTypes = {
  type: PropTypes.oneOf(['login', 'register', 'forgot', 'reset'])
};

export default LoginLinks;