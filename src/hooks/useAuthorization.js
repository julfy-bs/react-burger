import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '../services/helpers/getCookie.js';
import { ACCESS_TOKEN } from '../utils/constants.js';

export const useAuthorization = () => {
  const token = getCookie(ACCESS_TOKEN);
  const navigate = useNavigate();
  const location = useLocation();

  const isUserLoggedIn = useMemo(() => !!token, [token]);
  const previousUrl = useMemo(() => (location.state && location.state.background) ? location.state.background : null, [location])

  const handleProtectedRoute = useCallback((to) => {
    const { pathname } = location;
    navigate(to, { replace: true, state: { background: pathname } });
  }, [location, navigate]);

  const handleUnprotectedRoute = useCallback((to) => {
    navigate(to);
  }, [navigate]);

  return { isUserLoggedIn, handleProtectedRoute, handleUnprotectedRoute, previousUrl };
};
