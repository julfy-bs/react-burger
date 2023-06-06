import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './login-form.module.css';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const LoginForm = ({ type, values, handleSubmit, handleChange, errors, isValid }) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { profileFetchRequest } = useSelector(store => store.profile);
  const onIconClick = () => setIsVisiblePassword(!isVisiblePassword);

  const determineType = () => {
    switch (type) {
      case 'login':
        return (<>
          <EmailInput
            type={'email'}
            value={values.email || ''}
            onChange={handleChange}
            placeholder={'E-mail'}
            name={'email'}
            error={!!errors.email}
            errorText={errors.email}
            size={'default'}
            isIcon={false}
            required
          />
          <Input
            type={isVisiblePassword ? 'text' : 'password'}
            value={values.password || ''}
            onChange={handleChange}
            placeholder={'Пароль'}
            icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
            name={'password'}
            error={!!errors.password}
            errorText={errors.password}
            onIconClick={onIconClick}
            size={'default'}
            minLength={1}
            maxLength={20}
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!isValid || profileFetchRequest}
          >
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
            minLength={2}
            maxLength={20}
            required
          />
          <EmailInput
            placeholder={'E-mail'}
            value={values.email || ''}
            name={'email'}
            onChange={handleChange}
            type={'email'}
            error={!!errors.email}
            errorText={errors.email}
            size={'default'}
            isIcon={false}
            required
          />
          <Input
            type={isVisiblePassword ? 'text' : 'password'}
            value={values.password || ''}
            onChange={handleChange}
            placeholder={'Пароль'}
            icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
            name={'password'}
            error={!!errors.password}
            errorText={errors.password}
            onIconClick={onIconClick}
            size={'default'}
            minLength={8}
            maxLength={20}
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!isValid || profileFetchRequest}
          >
            Зарегистрироваться
          </Button>
        </>);
      case 'forgot':
        return (<>
          <h1 className={clsx('text', 'text_type_main-medium')}>Восстановление пароля</h1>
          <EmailInput
            placeholder={'E-mail'}
            value={values.email || ''}
            name={'email'}
            onChange={handleChange}
            type={'email'}
            error={!!errors.email}
            errorText={errors.email}
            size={'default'}
            isIcon={false}
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!isValid || profileFetchRequest}
          >
            Восстановить
          </Button>
        </>);
      case 'reset':
        return (<>
          <h1 className={clsx('text', 'text_type_main-medium')}>Восстановление пароля</h1>
          <Input
            type={isVisiblePassword ? 'text' : 'password'}
            placeholder={'Введите новый пароль'}
            onChange={handleChange}
            icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
            value={values.password || ''}
            name={'password'}
            error={!!errors.password}
            onIconClick={onIconClick}
            errorText={errors.password}
            size={'default'}
            extraClass="mt-6"
            minLength={8}
            maxLength={20}
            required
          />
          <Input
            type={'text'}
            value={values.token || ''}
            onChange={handleChange}
            placeholder={'Введите код из письма'}
            name={'token'}
            size={'default'}
            error={!!errors.token}
            errorText={errors.token}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!isValid || profileFetchRequest}
          >
            Сохранить
          </Button>
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
  type: PropTypes.oneOf(['login', 'register', 'forgot', 'reset']),
  values: PropTypes.shape({
    'name': PropTypes.string,
    'email': PropTypes.string,
    'password': PropTypes.string,
    'token': PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    'name': PropTypes.string,
    'email': PropTypes.string,
    'password': PropTypes.string,
    'token': PropTypes.string,
  }).isRequired,
  isValid: PropTypes.bool.isRequired
};

export default LoginForm;