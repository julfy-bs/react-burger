import clsx from 'clsx';
import styles from './forgot-password.module.css';
import { useForm } from '../../hooks/useForm';
import { FormEvent, useEffect } from 'react';
import { PATH } from '../../utils/config';
import { fetchForgotPassword } from '../../services/asyncThunk/forgotPasswordThunk';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { getPassword } from '../../services/helpers/getSelector';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const ForgotPasswordPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useAppDispatch();
  const { isEmailSubmitted, forgotPasswordRequest } = useAppSelector(getPassword);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmailSubmitted) navigate(PATH.RESET_PASSWORD);
  }, [navigate, isEmailSubmitted]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email) {
      dispatch(fetchForgotPassword({ email: values.email }));
    }
  };

  return (
    <section className={clsx(styles.container)}>
      <form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Восстановление пароля</h1>
        <Input
          placeholder={'E-mail'}
          value={values.email || ''}
          name={'email'}
          onChange={handleChange}
          type={'email'}
          error={!!errors.email}
          errorText={errors.email}
          size={'default'}
          required
          extraClass={clsx(styles.input_error)}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid || forgotPasswordRequest.fetch}
        >
          Восстановить
        </Button>
      </form>
      <ul className={clsx('page__list', styles.list)}>
        {
          forgotPasswordRequest.errorMessage && (
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text, styles.error_text)}>{forgotPasswordRequest.errorMessageContent}</span>
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