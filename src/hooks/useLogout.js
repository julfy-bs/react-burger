import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchLogout } from '../services/asyncThunk/logoutThunk.js';
import { getCookie } from '../services/helpers/getCookie.js';
import { REFRESH_TOKEN } from '../utils/constants.js';
import { getUser } from '../services/helpers/getSelector.js';

export const useLogout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getUser);

  const refreshToken = getCookie(REFRESH_TOKEN);
  const handleLogout = useCallback(() => {
    user.isLogin && refreshToken && dispatch(fetchLogout({ token: refreshToken }));
  }, [dispatch, user.isLogin, refreshToken]);

  return { handleLogout };
};