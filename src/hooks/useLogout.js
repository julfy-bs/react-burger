import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchLogout } from '../services/asyncThunk/logoutThunk.js';
import { getCookie } from '../services/helpers/getCookie.js';
import { REFRESH_TOKEN } from '../utils/constants.js';

export const useLogout = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(store => store.user.user);

  const refreshToken = getCookie(REFRESH_TOKEN);
  const handleLogout = useCallback(() => {
    isLogin && refreshToken && dispatch(fetchLogout({ token: refreshToken }));
  }, [dispatch, isLogin, refreshToken]);

  return { handleLogout };
};