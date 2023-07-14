import clsx from 'clsx';
import styles from './register.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { fetchRegister } from '../../services/asyncThunk/registerThunk';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../utils/config';
import { getRegister } from '../../services/helpers/getSelector';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const RegisterPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useAppDispatch();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { fetch, errorMessage, errorMessageContent } = useAppSelector(getRegister);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const onIconClick = () => setIsVisiblePassword(!isVisiblePassword);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email && values.password && values.name) {
      dispatch(fetchRegister({
        email: values.email,
        password: values.password,
        name: values.name,
      }));
    }
  };

  return (
    <section className={clsx(styles.container)}>
      <form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Регистрация</h1>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          value={values.name || ''}
          onChange={handleChange}
          error={!!errors.name}
          errorText={errors.name}
          size={'default'}
          minLength={2}
          maxLength={20}
          required
          extraClass={clsx(styles.input_error)}
        />
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
          extraClass={clsx(styles.input_error)}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid || fetch}
        >
          Зарегистрироваться
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
          <span className={clsx(styles.plain_text)}>Уже зарегистрированы?</span>
          <NavLink className={clsx(styles.app_link)} to={PATH.LOGIN}>Войти</NavLink>
        </li>
      </ul>
    </section>
  );
};
export default RegisterPage;