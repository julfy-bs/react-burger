import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../../services/helpers/getSelector';
import { PATH } from '../../utils/config';
import { JSX, ReactNode } from 'react';
import { useAppSelector } from '../../hooks/useRedux';

type Props = {
  children?: ReactNode;
  anonymous?: boolean;
}

const ProtectedRoute = ({ children, anonymous = false }: Props): JSX.Element => {
  const { user } = useAppSelector(getUser);
  const location = useLocation();
  const from = location?.state?.from || PATH.HOME;

  if (anonymous && user.isLogin) {
    return <Navigate to={from}/>;
  }

  if (!anonymous && !user.isLogin && user.isLogout) {
    return <Navigate to={PATH.HOME}/>;
  }

  if (!anonymous && !user.isLogin) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }}/>;
  }

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;