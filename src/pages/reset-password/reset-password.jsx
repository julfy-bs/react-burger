import clsx from 'clsx';
import styles from './reset-password.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { PATH } from '../../utils/config.js';
import { fetchResetPassword } from '../../services/asyncThunk/resetPasswordThunk.js';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getPassword } from '../../services/helpers/getSelector.js';

const ResetPasswordPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();
  const { isEmailSubmitted, isPasswordChanged, resetPasswordRequest } = useSelector(getPassword);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onIconClick = useCallback(() => setIsVisiblePassword(!isVisiblePassword), [isVisiblePassword]);

  useEffect(() => {
    if (!isEmailSubmitted)  {
      const { pathname } = location;
      navigate((PATH.FORGOT_PASSWORD), { state: { background: pathname } });
    }
    if (isPasswordChanged) {
      const { pathname } = location;
      navigate(((PATH.LOGIN)), { state: { background: pathname } });
    }
  }, [isEmailSubmitted, isPasswordChanged, location, navigate]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchResetPassword({
      password: values.password,
      token: values.token
    }));
  };

  return (
    <section className={clsx(styles.container)}>
      <form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
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
          minLength={8}
          maxLength={20}
          required
          extraClass={clsx(styles.input_error)}
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
          extraClass={clsx(styles.input_error)}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid || resetPasswordRequest.fetch}
        >
          Сохранить
        </Button>
      </form>
      <ul className={clsx('page__list', styles.list)}>
        {
          resetPasswordRequest.errorMessage && (
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text, styles.error_text)}>
                {resetPasswordRequest.errorMessageContent}
              </span>
            </li>
          )
        }
        <li className={clsx('text', 'text_type_main-small', styles.item)}>
          <span className={clsx(styles.plain_text)}>Вспомнили пароль?</span>
          <NavLink className={clsx(styles.app_link)} to={PATH.LOGIN}>Войти</NavLink>
        </li>
      </ul>
    </section>
  );
};

export default ResetPasswordPage;