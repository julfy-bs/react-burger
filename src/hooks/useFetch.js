import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { clearErrorMessage, setMessage } from '../services/slices/profileSlice.js';
import { useModal } from './useModal.js';

export const useFetch = () => {
  const dispatch = useDispatch();
  const { closeAnyModal, openNotificationModal } = useModal();

  const openNotification = useCallback(
    (message) => openNotificationModal(message),
    [openNotificationModal]
  );

  const closeNotification = useCallback(
    () => closeAnyModal() && dispatch(setMessage('')),
    [closeAnyModal, dispatch]
  );

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

