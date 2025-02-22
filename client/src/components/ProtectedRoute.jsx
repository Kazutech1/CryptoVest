import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-300 text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Redirect admin users to the admin dashboard
  if (isAdmin()) {
    return <Navigate to="/admins" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
