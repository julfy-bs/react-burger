import clsx from 'clsx';
import styles from './login.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { fetchLogin } from '../../services/asyncThunk/loginThunk.js';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../utils/config.js';
import { getLogin } from '../../services/helpers/getSelector.js';

const LoginPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { fetch, errorMessage, errorMessageContent } = useSelector(getLogin);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const onIconClick = () => setIsVisiblePassword(!isVisiblePassword);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    dispatch(fetchLogin({
      email: values.email,
      password: values.password
    }));
  }, [dispatch, values.email, values.password]);

  return (
    <section className={clsx(styles.container)}>
      <form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Вход</h1>
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
          extraClass={clsx(styles.input_error)}
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
          extraClass={clsx(styles.input_error)}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid || fetch}
        >
          Войти
        </Button>
      </form>
      <ul className={clsx('page__list', styles.list)}>
        {
          errorMessage && (
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text, styles.error_text)}>{errorMessageContent}</span>
            </li>
          )
        }
        <li className={clsx('text', 'text_type_main-small', styles.item)}>
          <span className={clsx(styles.plain_text)}>Вы — новый пользователь?</span>
          <NavLink className={clsx(styles.app_link)} to={PATH.REGISTER}>Зарегистрироваться</NavLink>
        </li>
        <li className={clsx('text', 'text_type_main-small', styles.item)}>
          <span className={clsx(styles.plain_text)}>Забыли пароль?</span>
          <NavLink className={clsx(styles.app_link)} to={PATH.FORGOT_PASSWORD}>Восстановить пароль</NavLink>
        </li>
      </ul>
    </section>
  );
};

export default LoginPage;