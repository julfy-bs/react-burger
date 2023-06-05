import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { clearErrorMessage, setMessage } from '../services/slices/profileSlice.js';
import { closeModal, openModalWithMessage } from '../services/slices/modalSlice.js';

export const useFetch = () => {
  const dispatch = useDispatch();

  const openNotification = useCallback((message) => {
    dispatch(openModalWithMessage(message));
  }, [dispatch]);

  const closeNotification = useCallback(() => {
    dispatch(closeModal());
    dispatch(setMessage(''));
  }, [dispatch]);

  const handleFulfilledFetch = useCallback(
    ({ fetchStatus, fetchError, message, handleFulfilledFetch = () => {} }) => {
    const successFetchCondition = !fetchStatus
      && !fetchError
      && message;
    if (successFetchCondition) {
      openNotification(message);
      setTimeout(() => closeNotification(), 2000);
      handleFulfilledFetch();
    }
  }, [closeNotification, openNotification]);

  const handleRejectedFetch = useCallback(
    ({ fetchStatus, fetchError, errorMessage, handleRejectedFetch = () => {} }) => {
    const failFetchCondition = !fetchStatus
      && fetchError
      && errorMessage;
    if (failFetchCondition) {
      setTimeout(() => dispatch(clearErrorMessage()), 4000);
      handleRejectedFetch();
    }
  }, [dispatch]);

  return { handleFulfilledFetch, handleRejectedFetch };
};

