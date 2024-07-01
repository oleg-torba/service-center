import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
}
