import clsx from 'clsx';
import styles from './profile-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm.js';
import { fetchGetUser, fetchUpdateUser } from '../../../services/asyncThunk/profileThunk.js';
import { clearErrorMessage } from '../../../services/slices/profileSlice.js';
import { useFetch } from '../../../hooks/useFetch.js';

const ProfileForm = () => {
  const { user, profileFetchRequest, profileFetchFailed, message, errorMessage } = useSelector(store => store.profile);
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const dispatch = useDispatch();
  const { handleFulfilledFetch, handleRejectedFetch } = useFetch();
  const [isEdit, setIsEdit] = useState({ name: false, email: false, password: false });
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const sameValues = (user.name !== values.name || user.email !== values.email || values.password);

  const isButtonActive = useMemo(
    () => (
      isValid && sameValues
    ), [isValid, sameValues]);

  useEffect(() => {
    dispatch(fetchGetUser());
  }, [dispatch]);

  useEffect(() => {
    errorMessage && setTimeout(() => dispatch(clearErrorMessage()), 2000);
  }, [dispatch, errorMessage]);

  useEffect(() => {
    resetForm({ name: user.name, email: user.email, password: '' });
  }, [resetForm, user]);

  const onIconNameClick = () => {
    setIsEdit({ ...isEdit, name: !isEdit.name });
    setTimeout(() => inputNameRef.current.focus(), 0);
  };

  const onIconEmailClick = () => {
    setIsEdit({ ...isEdit, email: !isEdit.email });
    setTimeout(() => inputEmailRef.current.focus(), 0);
  };

  const onIconPasswordClick = () => {
    setIsEdit({ ...isEdit, password: !isEdit.password });
    setTimeout(() => inputPasswordRef.current.focus(), 0);
  };

  const handleBlur = () => {
    setIsEdit({ name: false, email: false, password: false });
  };

  const handleResetValue = useCallback(() => {
    resetForm({ name: user.name, email: user.email, password: '' });
  }, [resetForm, user.email, user.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password.length < 8) {
      dispatch(fetchUpdateUser({ name: values.name, email: values.email }));
    } else {
      dispatch(fetchUpdateUser({
        name: values.name,
        email: values.email,
        password: values.password,
      }));
    }
  };

  useEffect(() => {
    handleFulfilledFetch({
      fetchStatus: profileFetchRequest,
      fetchError: profileFetchFailed,
      message,
      handleFulfilledFetch: () => handleResetValue()
    });
    handleRejectedFetch({
      fetchStatus: profileFetchRequest,
      fetchError: profileFetchFailed,
      errorMessage
    });
  }, [errorMessage, handleFulfilledFetch, handleRejectedFetch, handleResetValue, message, profileFetchFailed, profileFetchRequest]);

  return (
    <form className={clsx(styles.form)} onSubmit={handleSubmit}>
      <Input
        type={'text'}
        value={values.name || ''}
        onChange={(e) => handleChange(e)}
        placeholder={'Имя'}
        icon={'EditIcon'}
        name={'name'}
        error={!!errors.name}
        errorText={errors.name}
        size={'default'}
        onIconClick={onIconNameClick}
        disabled={!isEdit.name}
        ref={inputNameRef}
        onBlur={() => handleBlur()}
        minLength={2}
        maxLength={20}
      />
      <Input
        type={'email'}
        value={values.email || ''}
        onChange={(e) => handleChange(e)}
        onIconClick={onIconEmailClick}
        placeholder={'Логин'}
        icon={'EditIcon'}
        name={'email'}
        error={!!errors.email}
        errorText={errors.email}
        size={'default'}
        disabled={!isEdit.email}
        ref={inputEmailRef}
        onBlur={() => handleBlur()}
      />
      <Input
        type={isEdit.password ? 'text' : 'password'}
        value={values.password || ''}
        onIconClick={onIconPasswordClick}
        onChange={(e) => handleChange(e)}
        placeholder={'Пароль'}
        icon={'EditIcon'}
        name={'password'}
        error={!!errors.password}
        errorText={errors.password}
        size={'default'}
        ref={inputPasswordRef}
        disabled={!isEdit.password}
        minLength={8}
        maxLength={20}
        onBlur={() => handleBlur()}
      />
      {sameValues && <div className={clsx(styles.button_container)}>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={styles.button_secondary}
          onClick={() => handleResetValue()}
        >
          Отмена
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.button}
          disabled={!isButtonActive || profileFetchRequest || !values.email || values.name.length < 2}
        >
          {profileFetchRequest ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>}
      <span className={clsx('text', 'text_type_main-default', styles.errorMessage)}>
        {errorMessage}
      </span>
    </form>
  );
};


ProfileForm.propTypes = {};

export default ProfileForm;