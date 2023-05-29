import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './login-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
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
              type={'email'}
              placeholder={'E-mail'}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              icon={'ShowIcon'}
              name={'password'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
            <NavLink to={PATH.HOME}>
              <Button htmlType="button" type="primary" size="medium">
                Войти
              </Button>
            </NavLink>
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
            />
            <Input
              type={'email'}
              placeholder={'E-mail'}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              icon={'ShowIcon'}
              name={'password'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
            <NavLink to={PATH.LOGIN}>
              <Button htmlType="button" type="primary" size="medium">
                Зарегистрироваться
              </Button>
            </NavLink>
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
            />
            <NavLink to={PATH.RESET_PASSWORD}>
              <Button htmlType="button" type="primary" size="medium">
                Восстановить
              </Button>
            </NavLink>
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
              icon={'ShowIcon'}
            />
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
            <NavLink to={PATH.LOGIN}>
              <Button htmlType="button" type="primary" size="medium">
                Сохранить
              </Button>
            </NavLink>
          </>
        );
      case 'profile':
        return (
          <>
            <Input
              type={'text'}
              placeholder={'Имя'}
              icon={'EditIcon'}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
            <Input
              type={'email'}
              placeholder={'Логин'}
              icon={'EditIcon'}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              icon={'EditIcon'}
              name={'password'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
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
  type: PropTypes.oneOf(['login', 'register', 'forgot', 'reset', 'profile'])
};

export default LoginForm;