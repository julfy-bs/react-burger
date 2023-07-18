import clsx from 'clsx';
import styles from './login.module.css';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { fetchLogin } from '../../services/asyncThunk/loginThunk';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../utils/config';
import { getLogin } from '../../services/helpers/getSelector';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const LoginPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useAppDispatch();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { fetch, errorMessage, errorMessageContent } = useAppSelector(getLogin);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const onIconClick = () => setIsVisiblePassword(!isVisiblePassword);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email && values.password) {
      dispatch(fetchLogin({
        email: values.email,
        password: values.password
      }));
    }
  }, [dispatch, values.email, values.password]);

  return (
    <section className={clsx(styles.container)}>
      <form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Вход</h1>
        <Input
          type={'email'}
          value={values.email || ''}
          onChange={handleChange}
          placeholder={'E-mail'}
          name={'email'}
          error={!!errors.email}
          errorText={errors.email}
          size={'default'}
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