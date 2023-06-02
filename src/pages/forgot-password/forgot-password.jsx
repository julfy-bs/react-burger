import clsx from 'clsx';
import styles from './forgot-password.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useForm } from '../../hooks/useForm.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchForgotPassword } from '../../services/asyncThunk/profileThunk.js';
import { PATH } from '../../utils/config.js';
import { useCallback, useEffect } from 'react';
import { NOTIFICATION_EMAIL_SUBMITTED } from '../../utils/constants.js';
import { closeModal, openModalWithMessage } from '../../services/slices/modalSlice.js';
import { clearErrorMessage, setMessage } from '../../services/slices/profileSlice.js';

const ForgotPasswordPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, profileFetchRequest, profileFetchFailed, errorMessage } = useSelector(store => store.profile);

  const redirectToResetPasswordPage = useCallback(() => {
    navigate(PATH.RESET_PASSWORD, { replace: true });
  }, [navigate]);

  const handleFulfilledFetch = useCallback(() => {
    const logoutSuccessCondition = !profileFetchRequest
      && !profileFetchFailed
      && message === NOTIFICATION_EMAIL_SUBMITTED;
    if (logoutSuccessCondition) {
      dispatch(openModalWithMessage(message));
      setTimeout(() => dispatch(closeModal()) && dispatch(setMessage('')), 6000);
      redirectToResetPasswordPage();
    }
  }, [dispatch, message, profileFetchFailed, profileFetchRequest, redirectToResetPasswordPage]);

  const handleRejectedFetch = useCallback(() => {
    const logoutFailCondition = !profileFetchRequest
      && profileFetchFailed
      && errorMessage;
    logoutFailCondition && setTimeout(() => dispatch(clearErrorMessage()), 4000);
  }, [dispatch, errorMessage, profileFetchFailed, profileFetchRequest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchForgotPassword({ email: values.email }));
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    handleFulfilledFetch();
    handleRejectedFetch();
  }, [handleFulfilledFetch, handleRejectedFetch]);


  return (
    <section className={clsx(styles.container)}>
      <LoginForm type={'forgot'} values={values} handleChange={handleChange} handleSubmit={handleSubmit}/>
      <LoginLinks type={'forgot'}/>
    </section>
  );
};

export default ForgotPasswordPage;