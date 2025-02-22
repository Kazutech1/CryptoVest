import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-300 text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated() || !isAdmin()) {
    return <Navigate to="/profile" replace />; // Redirect non-admins to user dashboard
  }

  return <Outlet />;
};

export default AdminRoute;
