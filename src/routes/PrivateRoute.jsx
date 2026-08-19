import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  const hasToken = !!localStorage.getItem("token");

  const isLoggingOut = localStorage.getItem("isLoggingOut") === "true";

  if (isLoading && !isLoggingOut) return <div>Loading...</div>;

  if (isLoggingOut || isAuthenticated || hasToken) {
    return children;
  }

  return <Navigate to="/login" replace />;
};
