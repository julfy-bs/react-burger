import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './login-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { PATH } from '../../utils/config.js';

const LoginForm = ({ type }) => {
  // todo: input value + input onchange listener

  const determineType = () => {
    switch (type) {
      case 'login':
        return (
          <>
            <h1 className={clsx('text', 'text_type_main-medium')}>Вход</h1>
            <Input
              type={'text'}
              placeholder={'E-mail'}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              icon={'ShowIcon'}
              name={'password'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
            <Link to={PATH.HOME}>
              <Button htmlType="button" type="primary" size="medium">
                Войти
              </Button>
            </Link>
          </>
        );
      case 'register':
        return (
          <>
            <h1 className={clsx('text', 'text_type_main-medium')}>Регистрация</h1>
            <Input
              type={'text'}
              placeholder={'Имя'}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
            <Input
              type={'text'}
              placeholder={'E-mail'}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              icon={'ShowIcon'}
              name={'password'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
            <Link to={PATH.LOGIN}>
              <Button htmlType="button" type="primary" size="medium">
                Зарегистрироваться
              </Button>
            </Link>
          </>
        );
      case 'forgot':
        return (
          <>
            <h1 className={clsx('text', 'text_type_main-medium')}>Восстановление пароля</h1>
            <Input
              type={'text'}
              placeholder={'Укажите e-mail'}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
            <Link to={PATH.RESET_PASSWORD}>
              <Button htmlType="button" type="primary" size="medium">
                Восстановить
              </Button>
            </Link>
          </>
        );
      case 'reset':
        return (
          <>
            <h1 className={clsx('text', 'text_type_main-medium')}>Восстановление пароля</h1>
            <Input
              type={'password'}
              placeholder={'Введите новый пароль'}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
              icon={'ShowIcon'}
            />
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
            <Link to={PATH.LOGIN}>
              <Button htmlType="button" type="primary" size="medium">
                Сохранить
              </Button>
            </Link>
          </>
        );
      default:
        return (<h1>unknown type</h1>);
    }
  };

  return (
    <div className={clsx(styles.login_form)}>
      {determineType()}
    </div>
  );
};


LoginForm.propTypes = {
  type: PropTypes.oneOf(['login', 'register', 'forgot', 'reset'])
};

export default LoginForm;