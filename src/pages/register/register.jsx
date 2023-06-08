import clsx from 'clsx';
import styles from './register.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { useFetch } from '../../hooks/useFetch.js';
import { fetchRegister } from '../../services/asyncThunk/profileThunk.js';

const RegisterPage = () => {
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