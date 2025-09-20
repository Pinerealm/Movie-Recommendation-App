import { Navigate } from 'react-router-dom';
import userService from '../services/userService';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = userService.isAuthenticated();
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;