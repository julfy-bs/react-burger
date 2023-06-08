import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '../services/helpers/getCookie.js';
import { ACCESS_TOKEN, EXPIRES_AT, REFRESH_TOKEN } from '../utils/constants.js';
import { useSelector } from 'react-redux';

export const useAuthorization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector(store => store.profile);

  const tokenData = useMemo(() => {
    if (token === null) {
      return {
        accessToken: getCookie(ACCESS_TOKEN),
        refreshToken: getCookie(REFRESH_TOKEN),
        expiresAt: getCookie(EXPIRES_AT)
      };
    } else {
      return token;
    }
  }, [token]);

  const isTokenExpired = useMemo(() => Date.now() >= tokenData.expiresAt, [tokenData]);
  const isUserLoggedIn = useMemo(() => !!tokenData.accessToken, [tokenData.accessToken]);
  const previousUrl = useMemo(() => (location.state && location.state.background) ? location.state.background : null, [location]);

  const handleProtectedRoute = useCallback((to) => {
    const { pathname } = location;
    navigate(to, { replace: true, state: { background: pathname } });
  }, [location, navigate]);

  const handleUnprotectedRoute = useCallback((to) => {
    navigate(to);
  }, [navigate]);

  return { isUserLoggedIn, handleProtectedRoute, handleUnprotectedRoute, previousUrl, isTokenExpired };
};
