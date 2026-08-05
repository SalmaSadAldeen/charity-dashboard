import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);


  const hasToken = !!localStorage.getItem("token");

  if (isLoading) return <div>Loading...</div>;


  return isAuthenticated || hasToken ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};
