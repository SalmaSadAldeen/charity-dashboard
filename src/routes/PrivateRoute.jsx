import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  const hasToken = !!localStorage.getItem("token");

  // إذا كان المستخدم ضغط على خروج وبدأ العد التنازلي، نثبت الواجهة ولا نحوله أبداً للوجن
  const isLoggingOut = localStorage.getItem("isLoggingOut") === "true";

  if (isLoading && !isLoggingOut) return <div>Loading...</div>;

  if (isLoggingOut || isAuthenticated || hasToken) {
    return children;
  }

  return <Navigate to="/login" replace />;
};
