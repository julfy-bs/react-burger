import { useAuthorization } from '../../hooks/useAuthorization.js';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, anonymous = false }) => {
  const { isUserLoggedIn } = useAuthorization();
  const location = useLocation();
  const from = location.state?.from || '/';
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isUserLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from}/>;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isUserLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;

};

ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  anonymous: PropTypes.bool
};

export default ProtectedRoute;