import clsx from 'clsx';
import styles from './login.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { fetchLogin } from '../../services/asyncThunk/loginThunk.js';

const LoginPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();



  useEffect(() => {
    resetForm();
  }, [resetForm]);


  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    dispatch(fetchLogin({
      email: values.email,
      password: values.password
    }));
  }, [dispatch, values.email, values.password]);

  return (
    <section className={clsx(styles.container)}>
      <LoginForm
        type={'login'}
        errors={errors}
        values={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isValid={isValid}
      />
      <LoginLinks type={'login'}/>
    </section>
  );
};

export default LoginPage;