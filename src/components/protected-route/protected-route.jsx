import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../services/helpers/getSelector.js';
import { PATH } from '../../utils/config.js';

const ProtectedRoute = ({ children, anonymous = false }) => {
  const { user } = useSelector(getUser);
  const location = useLocation();
  const from = location.state?.from || PATH.HOME;

  if (anonymous && user.isLogin) {
    return <Navigate to={from}/>;
  }

  if (!anonymous && !user.isLogin && user.isLogout) {
    return <Navigate to={PATH.HOME} />;
  }

  if (!anonymous && !user.isLogin) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }}/>;
  }

  return children;
};

ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  anonymous: PropTypes.bool
};

export default ProtectedRoute;