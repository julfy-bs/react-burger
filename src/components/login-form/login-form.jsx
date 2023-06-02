import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './login-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const LoginForm = ({ type, values, handleSubmit, handleChange }) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { email, name, password } = useSelector(store => store.profile);

  const onIconClick = () => setIsVisiblePassword(!isVisiblePassword);

  const determineType = () => {
    switch (type) {
      case 'login':
        return (<>
          <Input
            type={'email'}
            value={values.email || ''}
            onChange={handleChange}
            placeholder={'E-mail'}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={isVisiblePassword ? 'text' : 'password'}
            value={values.password || ''}
            onChange={handleChange}
            placeholder={'Пароль'}
            icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            onIconClick={onIconClick}
            size={'default'}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </>);
      case 'register':
        return (<>
          <h1 className={clsx('text', 'text_type_main-medium')}>Регистрация</h1>
          <Input
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            value={values.name || ''}
            onChange={handleChange}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            value={values.email || ''}
            name={'email'}
            onChange={handleChange}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={isVisiblePassword ? 'text' : 'password'}
            placeholder={'Пароль'}
            value={values.password || ''}
            onChange={handleChange}
            icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            onIconClick={onIconClick}
            size={'default'}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </>);
      case 'forgot':
        return (<>
          <h1 className={clsx('text', 'text_type_main-medium')}>Восстановление пароля</h1>
          <Input
            type={'email'}
            value={values.email || ''}
            onChange={handleChange}
            placeholder={'Укажите e-mail'}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </>);
      case 'reset':
        return (<>
          <h1 className={clsx('text', 'text_type_main-medium')}>Восстановление пароля</h1>
          <Input
            type={isVisiblePassword ? 'text' : 'password'}
            value={values.password || ''}
            onChange={handleChange}
            placeholder={'Введите новый пароль'}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            onIconClick={onIconClick}
            icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
          />
          <Input
            type={'text'}
            value={values.token || ''}
            onChange={handleChange}
            placeholder={'Введите код из письма'}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </>);
      case 'profile':
        return (<>
          <Input
            type={'text'}
            value={name}
            onChange={handleChange}
            placeholder={'Имя'}
            icon={'EditIcon'}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'email'}
            value={email}
            onChange={handleChange}
            placeholder={'Логин'}
            icon={'EditIcon'}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={isVisiblePassword ? 'text' : 'password'}
            onIconSubmit={onIconClick}
            value={password}
            onChange={handleChange}
            placeholder={'Пароль'}
            icon={'EditIcon'}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </>);
      default:
        return (<h1>unknown type</h1>);
    }
  };

  return (
    <form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
      {determineType()}
    </form>
  );
};


LoginForm.propTypes = {
  type: PropTypes.oneOf(['login', 'register', 'forgot', 'reset', 'profile'])
};

export default LoginForm;