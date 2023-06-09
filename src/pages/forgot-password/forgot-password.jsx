import clsx from 'clsx';
import styles from './forgot-password.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { useEffect } from 'react';
import { useAuthorization } from '../../hooks/useAuthorization.js';
import { PATH } from '../../utils/config.js';
import { fetchForgotPassword } from '../../services/asyncThunk/forgotPasswordThunk.js';

const ForgotPasswordPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();
  const { handleUnprotectedRoute } = useAuthorization();
  const { isEmailSubmitted } = useSelector(store => store.password);

  useEffect(() => {
    if (isEmailSubmitted) handleUnprotectedRoute(PATH.RESET_PASSWORD);
  }, [handleUnprotectedRoute, isEmailSubmitted]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

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