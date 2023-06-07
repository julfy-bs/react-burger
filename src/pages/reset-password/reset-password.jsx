import clsx from 'clsx';
import styles from './reset-password.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { useAuthorization } from '../../hooks/useAuthorization.js';
import { useFetch } from '../../hooks/useFetch.js';
import { fetchResetPassword } from '../../services/asyncThunk/profileThunk.js';
import { PATH } from '../../utils/config.js';

const ResetPasswordPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();
  const { isEmailSubmitted, isPasswordChanged } = useSelector(store => store.profile);
  const { isUserLoggedIn, handleProtectedRoute } = useAuthorization();
  const { handleFulfilledFetch, handleRejectedFetch } = useFetch();
  const { message, profileFetchRequest, profileFetchFailed, errorMessage } = useSelector(store => store.profile);

  useEffect(() => {
    if (isUserLoggedIn) handleProtectedRoute(PATH.HOME);
    if (!isUserLoggedIn && !isEmailSubmitted) handleProtectedRoute(PATH.FORGOT_PASSWORD);
    if (isPasswordChanged) handleProtectedRoute(PATH.LOGIN);
  }, [handleProtectedRoute, isEmailSubmitted, isPasswordChanged, isUserLoggedIn]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchResetPassword({
      password: values.password,
      token: values.token
    }));
  };

  return (
    <section className={clsx(styles.container)}>
      <LoginForm
        type={'reset'}
        errors={errors}
        isValid={isValid}
        values={values}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <LoginLinks type={'reset'}/>
    </section>
  );
};

export default ResetPasswordPage;