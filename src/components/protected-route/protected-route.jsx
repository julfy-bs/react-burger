import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PATH } from '../../utils/config.js';

const ProtectedRoute = ({ children, anonymous = false }) => {
  const { isLogin, isLogout } = useSelector(store => store.user.user);
  const location = useLocation();
  const from = location.state?.from || PATH.HOME;

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLogin) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from}/>;
  }

  // Если пользователь нажал кнопку выйти
  if (!anonymous && !isLogin && isLogout) {
    // то отправляем его на страницу главная
    return <Navigate to={PATH.HOME} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLogin) {
    // ...то отправляем его на страницу логин
    return <Navigate to={PATH.LOGIN} state={{ from: location }}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
};

ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  anonymous: PropTypes.bool
};

export default ProtectedRoute;