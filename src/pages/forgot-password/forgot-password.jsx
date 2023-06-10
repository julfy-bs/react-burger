import clsx from 'clsx';
import styles from './forgot-password.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { useEffect } from 'react';
import { PATH } from '../../utils/config.js';
import { fetchForgotPassword } from '../../services/asyncThunk/forgotPasswordThunk.js';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();
  const { isEmailSubmitted } = useSelector(store => store.password);
  const { fetch, errorMessage, errorMessageContent } = useSelector(store => store.password.forgotPasswordRequest);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmailSubmitted) navigate(PATH.RESET_PASSWORD);
  }, [navigate, isEmailSubmitted]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchForgotPassword({ email: values.email }));
  };

  return (
    <section className={clsx(styles.container)}>
      <form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
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
          extraClass={clsx(styles.input_error)}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid || fetch}
        >
          Восстановить
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
          <span className={clsx(styles.plain_text)}>Вспомнили пароль?</span>
          <NavLink className={clsx(styles.app_link)} to={PATH.LOGIN}>Войти</NavLink>
        </li>
      </ul>
    </section>
  );
};

export default ForgotPasswordPage;