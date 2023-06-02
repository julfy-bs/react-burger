import clsx from 'clsx';
import styles from './register.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';
import { clearErrorMessage, setMessage } from '../../services/slices/profileSlice.js';
import { closeModal, openModalWithMessage } from '../../services/slices/modalSlice.js';
import { fetchRegister } from '../../services/asyncThunk/profileThunk.js';
import { NOTIFICATION_USER_CREATED } from '../../utils/constants.js';
import { PATH } from '../../utils/config.js';

const RegisterPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, profileFetchRequest, profileFetchFailed, errorMessage } = useSelector(store => store.profile);

  const redirectToLoginPage = useCallback(() => {
    navigate(PATH.LOGIN, { replace: true });
  }, [navigate]);

  const handleFulfilledFetch = useCallback(() => {
    const logoutSuccessCondition = !profileFetchRequest
      && !profileFetchFailed
      && message === NOTIFICATION_USER_CREATED;
    if (logoutSuccessCondition) {
      dispatch(openModalWithMessage(message));
      setTimeout(() => {
        dispatch(closeModal());
        dispatch(setMessage(''));
      }, 2000);
      redirectToLoginPage();
    }
  }, [dispatch, message, profileFetchFailed, profileFetchRequest, redirectToLoginPage]);

  const handleRejectedFetch = useCallback(() => {
    const logoutFailCondition = !profileFetchRequest
      && profileFetchFailed
      && errorMessage;
    logoutFailCondition && setTimeout(() => dispatch(clearErrorMessage()), 4000);
  }, [dispatch, errorMessage, profileFetchFailed, profileFetchRequest]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    handleFulfilledFetch();
    handleRejectedFetch();
  }, [handleFulfilledFetch, handleRejectedFetch]);


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
      <LoginForm type={'register'} values={values} handleSubmit={handleSubmit} handleChange={handleChange}/>
      <LoginLinks type={'register'}/>
    </section>
  );
};
export default RegisterPage;