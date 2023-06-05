import clsx from 'clsx';
import styles from './register.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { useAuthorization } from '../../hooks/useAuthorization.js';
import { useFetch } from '../../hooks/useFetch.js';
import { fetchRegister } from '../../services/asyncThunk/profileThunk.js';
import { PATH } from '../../utils/config.js';

const RegisterPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const { isUserLoggedIn, handleUnprotectedRoute } = useAuthorization();
  const { handleFulfilledFetch, handleRejectedFetch } = useFetch();
  const { message, profileFetchRequest, profileFetchFailed, errorMessage } = useSelector(store => store.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLoggedIn) handleUnprotectedRoute(PATH.HOME);
  }, [handleUnprotectedRoute, isUserLoggedIn]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    handleFulfilledFetch({
      fetchStatus: profileFetchRequest,
      fetchError: profileFetchFailed,
      messageContent: message,
      handleFulfilledFetch: () => handleUnprotectedRoute(PATH.HOME)
    });
    handleRejectedFetch({
      fetchStatus: profileFetchRequest,
      fetchError: profileFetchFailed,
      errorMessage: errorMessage,
    });
  }, [errorMessage, handleFulfilledFetch, handleRejectedFetch, handleUnprotectedRoute, message, profileFetchFailed, profileFetchRequest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchRegister({
      email: values.email,
      password: values.password,
      name: values.name,
    }));
  };

  return (
    <section className={clsx(styles.container)}>
      <LoginForm
        type={'register'}
        errors={errors}
        isValid={isValid}
        values={values}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <LoginLinks type={'register'}/>
    </section>
  );
};
export default RegisterPage;