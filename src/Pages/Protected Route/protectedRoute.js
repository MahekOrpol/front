import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("user_Id"); // Check if user is logged in

  return isAuthenticated ? element : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
