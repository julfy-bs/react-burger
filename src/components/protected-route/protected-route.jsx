import { useEffect } from 'react';
import { useAuthorization } from '../../hooks/useAuthorization.js';

const ProtectedRoute = ({ children, redirectTo }) => {
  const { isUserLoggedIn, handleProtectedRoute } = useAuthorization();

  useEffect(() => {
    if (!isUserLoggedIn) {
      handleProtectedRoute(redirectTo)
    }
  }, [handleProtectedRoute, isUserLoggedIn, redirectTo])

  return children;
};

export default ProtectedRoute;