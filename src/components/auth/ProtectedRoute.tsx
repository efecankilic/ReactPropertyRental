import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext, {AuthContextType} from './AuthContext';

const ProtectedRoute = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  return auth.isLoggedIn ? <Outlet /> : <Navigate to='/signin' replace />;
};
export default ProtectedRoute;
