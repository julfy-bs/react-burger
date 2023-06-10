import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../services/slices/userSlice.js';
import { getCookie } from '../services/helpers/getCookie.js';
import { ACCESS_TOKEN, EXPIRES_AT, REFRESH_TOKEN } from '../utils/constants.js';

export const useAuthorization = () => {
  const location = useLocation();
  const { token } = useSelector(store => store.user.user);
  const dispatch = useDispatch();

  const tokenData = useMemo(() => {
    const accessToken = getCookie(ACCESS_TOKEN);
    const refreshToken = getCookie(REFRESH_TOKEN);
    const expiresAt = getCookie(EXPIRES_AT);

    if (!accessToken && !refreshToken) {
      dispatch(updateUser({ isLogin: false }));
      return null;
    } else if (!accessToken && refreshToken) {
      dispatch(updateUser({
        token: {
          accessToken,
          refreshToken,
          expiresAt
        }
      }));
      return {
        refreshToken: getCookie(REFRESH_TOKEN),
        expiresAt: getCookie(EXPIRES_AT)
      }
    } else {
      dispatch(updateUser({ isLogin: true }));
      return {
        accessToken: getCookie(ACCESS_TOKEN),
        refreshToken: getCookie(REFRESH_TOKEN),
        expiresAt: getCookie(EXPIRES_AT)
      }
    }
  }, [dispatch]);

  const isTokenExpired = useMemo(() => {
    if (token) {
      const expiresAt = getCookie(EXPIRES_AT);
      return Date.now() >= expiresAt;
    } else {
      return true;
    }
  }, [token]);
  const previousUrl = useMemo(() => (location.state && location.state.background) ? location.state.background : null, [location]);

  return { tokenData, previousUrl, isTokenExpired };
};
