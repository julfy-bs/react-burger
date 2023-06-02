import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal, openModalWithMessage } from '../../services/slices/modalSlice.js';
import { clearErrorMessage, setMessage } from '../../services/slices/profileSlice.js';
import { fetchLogout } from '../../services/asyncThunk/profileThunk.js';
import { NOTIFICATION_LOGOUT_SUCCESS } from '../../utils/constants.js';
import { PATH } from '../../utils/config.js';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLogin,
    message,
    profileFetchRequest,
    profileFetchFailed,
    errorMessage
  } = useSelector(store => store.profile);

  const redirectToLoginPage = useCallback(() => {
    navigate(PATH.LOGIN, { replace: true });
  }, [navigate]);

  const handleFulfilledFetch = useCallback(() => {
    const logoutSuccessCondition = !profileFetchRequest
      && !profileFetchFailed
      && message === NOTIFICATION_LOGOUT_SUCCESS;
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
    const logoutFailCondition = !profileFetchRequest
      && profileFetchFailed
      && errorMessage;
    logoutFailCondition && setTimeout(() => dispatch(clearErrorMessage()), 4000);
  }, [dispatch, errorMessage, profileFetchFailed, profileFetchRequest]);

  const handleLogout = useCallback(() => {
    (isLogin) ? dispatch(fetchLogout()) : redirectToLoginPage();
    handleFulfilledFetch();
    handleRejectedFetch();
  }, [dispatch, handleFulfilledFetch, handleRejectedFetch, isLogin, redirectToLoginPage]);

  useEffect(() => handleLogout(), [handleLogout]);
};

export default Logout;
