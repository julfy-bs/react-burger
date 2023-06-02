import clsx from 'clsx';
import styles from './reset-password.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';
import { clearErrorMessage, setMessage } from '../../services/slices/profileSlice.js';
import { closeModal, openModalWithMessage } from '../../services/slices/modalSlice.js';
import { fetchResetPassword } from '../../services/asyncThunk/profileThunk.js';
import { NOTIFICATION_PASSWORD_RESET } from '../../utils/constants.js';
import { PATH } from '../../utils/config.js';

const ResetPasswordPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    message,
    profileFetchRequest,
    profileFetchFailed,
    errorMessage,
    isEmailSubmitted
  } = useSelector(store => store.profile);

  const redirectToForgotPasswordPage = useCallback(() => {
    navigate(PATH.FORGOT_PASSWORD, { replace: true });
  }, [navigate]);

  const redirectToLoginPage = useCallback(() => {
    navigate(PATH.LOGIN, { replace: true });
  }, [navigate]);

  const handleFulfilledFetch = useCallback(() => {
    const logoutSuccessCondition = !profileFetchRequest
      && !profileFetchFailed
      && message === NOTIFICATION_PASSWORD_RESET;
    if (logoutSuccessCondition) {
      dispatch(openModalWithMessage(message));
      setTimeout(() => {
        dispatch(closeModal());
        dispatch(setMessage(''));
      }, 6000);
      redirectToLoginPage();
    }
  }, [dispatch, message, profileFetchFailed, profileFetchRequest, redirectToLoginPage]);

  const handleRejectedFetch = useCallback(() => {
    const logoutFailCondition = !profileFetchRequest && profileFetchFailed && errorMessage;
    logoutFailCondition && setTimeout(() => dispatch(clearErrorMessage()), 4000);
  }, [dispatch, errorMessage, profileFetchFailed, profileFetchRequest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchResetPassword({
      password: values.password,
      token: values.token
    }));
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    !isEmailSubmitted && redirectToForgotPasswordPage();
  }, [isEmailSubmitted, redirectToForgotPasswordPage]);

  useEffect(() => {
    handleFulfilledFetch();
    handleRejectedFetch();
  }, [handleFulfilledFetch, handleRejectedFetch]);


  return (
    <section className={clsx(styles.container)}>
      <LoginForm type={'reset'} values={values} handleSubmit={handleSubmit} handleChange={handleChange}/>
      <LoginLinks type={'reset'}/>
    </section>
  );
};

export default ResetPasswordPage;