import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({children, redirectTo }) => {
  const { isLogin } = useSelector(store => store.profile);
  return isLogin ? children : <Navigate to={redirectTo} />;;
};

export default ProtectedRoute;