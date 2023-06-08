import clsx from 'clsx';
import styles from './login.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { useFetch } from '../../hooks/useFetch.js';
import { fetchLogin } from '../../services/asyncThunk/profileThunk.js';

const LoginPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const { handleFulfilledFetch, handleRejectedFetch } = useFetch();
  const { message, profileFetchRequest, profileFetchFailed, errorMessage } = useSelector(store => store.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    handleFulfilledFetch({
      fetchStatus: profileFetchRequest,
      fetchError: profileFetchFailed,
      message: message,
    });
    handleRejectedFetch({
      fetchStatus: profileFetchRequest,
      fetchError: profileFetchFailed,
      errorMessage: errorMessage,
    });
  }, [errorMessage, handleFulfilledFetch, handleRejectedFetch, message, profileFetchFailed, profileFetchRequest]);

  const handleSubmit = useCallback((e) => {
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