import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { fetchLogout } from '../services/asyncThunk/profileThunk.js';
import { useAuthorization } from './useAuthorization.js';

export const useLogout = () => {
  const dispatch = useDispatch();
  const { isUserLoggedIn } = useAuthorization();

  const handleLogout = useCallback(() => {
    isUserLoggedIn && dispatch(fetchLogout());
  }, [dispatch, isUserLoggedIn]);

  return { handleLogout };
};