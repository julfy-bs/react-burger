import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCookie } from '../services/helpers/getCookie.js';
import { EXPIRES_AT } from '../utils/constants.js';

export const useAuthorization = () => {
  const location = useLocation();
  const { token } = useSelector(store => store.user.user);

  const isTokenExpired = useMemo(() => {
    if (token) {
      const expiresAt = getCookie(EXPIRES_AT);
      return Date.now() >= expiresAt;
    } else {
      return true;
    }
  }, [token]);
  const previousUrl = useMemo(() => (location.state && location.state.background) ? location.state.background : null, [location]);

  return { previousUrl, isTokenExpired };
};
