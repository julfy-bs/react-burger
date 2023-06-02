import clsx from 'clsx';
import styles from './login.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';
import { clearErrorMessage, setMessage } from '../../services/slices/profileSlice.js';
import { closeModal, openModalWithMessage } from '../../services/slices/modalSlice.js';
import { fetchLogin } from '../../services/asyncThunk/profileThunk.js';
import { PATH } from '../../utils/config.js';
import { NOTIFICATION_LOGIN_SUCCESS } from '../../utils/constants.js';

const LoginPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, profileFetchRequest, profileFetchFailed, errorMessage } = useSelector(store => store.profile);

  const redirectToHomePage = useCallback(() => {
    navigate(PATH.HOME, { replace: true });
  }, [navigate]);

  const handleFulfilledFetch = useCallback(() => {
    const logoutSuccessCondition = !profileFetchRequest
      && !profileFetchFailed
      && message === NOTIFICATION_LOGIN_SUCCESS;
    if (logoutSuccessCondition) {
      dispatch(openModalWithMessage(message));
      setTimeout(() => {
        dispatch(closeModal());
        dispatch(setMessage(''));
      }, 2000);
      redirectToHomePage();
    }
  }, [dispatch, message, profileFetchFailed, profileFetchRequest, redirectToHomePage]);

  const handleRejectedFetch = useCallback(() => {
    const logoutFailCondition = !profileFetchRequest
      && profileFetchFailed
      && errorMessage;
    logoutFailCondition && setTimeout(() => dispatch(clearErrorMessage()), 4000);
  }, [dispatch, errorMessage, profileFetchFailed, profileFetchRequest]);


  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(fetchLogin({
      email: values.email,
      password: values.password
    }));
  }, [dispatch, values.email, values.password]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    handleFulfilledFetch();
    handleRejectedFetch();
  }, [handleFulfilledFetch, handleRejectedFetch]);

  return (
    <section className={clsx(styles.container)}>
      <LoginForm type={'login'} values={values} handleChange={handleChange} handleSubmit={handleSubmit}/>
      <LoginLinks type={'login'}/>
    </section>
  );
};

export default LoginPage;