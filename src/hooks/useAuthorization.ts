import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getCookie } from '../services/helpers/getCookie';
import { EXPIRES_AT } from '../utils/constants';

export const useAuthorization = () => {
  const location = useLocation();

  const isTokenExpired = useMemo(() => {
    const expiresAt = getCookie(EXPIRES_AT);
    return (expiresAt)
      ? Date.now() >= +expiresAt
      : true;
  }, []);
  const previousUrl = useMemo(() =>
      (location.state && location.state.background)
        ? location?.state?.background
        : null,
    [location]);

  return { previousUrl, isTokenExpired };
};
