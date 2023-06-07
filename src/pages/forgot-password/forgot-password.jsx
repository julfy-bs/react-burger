import clsx from 'clsx';
import styles from './forgot-password.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { useEffect } from 'react';
import { useAuthorization } from '../../hooks/useAuthorization.js';
import { useFetch } from '../../hooks/useFetch.js';
import { fetchForgotPassword } from '../../services/asyncThunk/profileThunk.js';
import { PATH } from '../../utils/config.js';

const ForgotPasswordPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();
  const { isUserLoggedIn, handleUnprotectedRoute } = useAuthorization();
  const { handleFulfilledFetch, handleRejectedFetch } = useFetch();
  const { message, profileFetchRequest, profileFetchFailed, errorMessage } = useSelector(store => store.profile);
  const { isEmailSubmitted } = useSelector(store => store.profile);

  useEffect(() => {
    if (isUserLoggedIn) handleUnprotectedRoute(PATH.HOME);
  }, [handleUnprotectedRoute, isUserLoggedIn]);

  useEffect(() => {
    if (isEmailSubmitted && !isUserLoggedIn) handleUnprotectedRoute(PATH.RESET_PASSWORD);
  }, [handleUnprotectedRoute, isEmailSubmitted, isUserLoggedIn]);

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
  }, [errorMessage, handleFulfilledFetch, handleRejectedFetch, handleUnprotectedRoute, message, profileFetchFailed, profileFetchRequest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchForgotPassword({ email: values.email }));
  };

  return (
    <section className={clsx(styles.container)}>
      <LoginForm
        type={'forgot'}
        values={values}
        errors={errors}
        isValid={isValid}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <LoginLinks type={'forgot'}/>
    </section>
  );
};

export default ForgotPasswordPage;