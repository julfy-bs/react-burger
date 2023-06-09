import clsx from 'clsx';
import styles from './register.module.css';
import LoginForm from '../../components/login-form/login-form.jsx';
import LoginLinks from '../../components/login-links/login-links.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { fetchRegister } from '../../services/asyncThunk/registerThunk.js';

const RegisterPage = () => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

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