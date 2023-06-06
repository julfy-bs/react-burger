import { useEffect } from 'react';
import { useAuthorization } from '../../hooks/useAuthorization.js';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, redirectTo }) => {
  const { handleProtectedRoute, isUserLoggedIn } = useAuthorization();

  useEffect(() => {
    if (!isUserLoggedIn) {
      handleProtectedRoute(redirectTo)
    }
  }, [handleProtectedRoute, isUserLoggedIn, redirectTo])

  return children;
};

ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
};

export default ProtectedRoute;