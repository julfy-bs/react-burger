import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './login-links.module.css';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../utils/config.js';
import { useMemo } from 'react';

const LoginLinks = ({ type }) => {


  const errorMessage = useMemo(() => false, []);

  const determineType = () => {
    switch (type) {
      case 'login':
        return (
          <>
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text)}>Вы — новый пользователь?</span>
              <NavLink className={clsx(styles.app_link)} to={PATH.REGISTER}>Зарегистрироваться</NavLink>
            </li>
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text)}>Забыли пароль?</span>
              <NavLink className={clsx(styles.app_link)} to={PATH.FORGOT_PASSWORD}>Восстановить пароль</NavLink>
            </li>
          </>
        );
      case 'register':
        return (
          <>
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text)}>Уже зарегистрированы?</span>
              <NavLink className={clsx(styles.app_link)} to={PATH.LOGIN}>Войти</NavLink>
            </li>
          </>
        );
      case 'forgot':
        return (
          <>
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text)}>Вспомнили пароль?</span>
              <NavLink className={clsx(styles.app_link)} to={PATH.LOGIN}>Войти</NavLink>
            </li>
          </>
        );
      case 'reset':
        return (
          <>
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text)}>Вспомнили пароль?</span>
              <NavLink className={clsx(styles.app_link)} to={PATH.LOGIN}>Войти</NavLink>
            </li>
          </>
        );
      default:
        return (<h1>unknown type</h1>);
    }
  };

  return (
    <ul className={clsx('page__list', styles.list)}>
      <li className={clsx('text', 'text_type_main-small', styles.item)}>
        <span className={clsx(styles.plain_text, styles.error_text)}>{errorMessage}</span>
      </li>
      {determineType()}
    </ul>
  );
};


LoginLinks.propTypes = {
  type: PropTypes.oneOf(['login', 'register', 'forgot', 'reset']).isRequired
};

export default LoginLinks;