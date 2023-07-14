import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCookie } from '../services/helpers/getCookie';
import { EXPIRES_AT } from '../utils/constants.js';
import { getUser } from '../services/helpers/getSelector';

export const useAuthorization = () => {
  const location = useLocation();
  const { user } = useSelector(getUser);

  const isTokenExpired = useMemo(() => {
    if (user.token) {
      const expiresAt = getCookie(EXPIRES_AT);
      return Date.now() >= expiresAt;
    } else {
      return true;
    }
  }, [user.token]);
  const previousUrl = useMemo(() => (location.state && location.state.background) ? location?.state?.background : null, [location]);

  return { previousUrl, isTokenExpired };
};
