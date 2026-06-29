import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // تحقق إضافي: هل التوكن موجود في المتصفح؟
  const hasToken = !!localStorage.getItem("token");

  if (isLoading) return <div>Loading...</div>;

  // إذا كان authenticated في الريدكس أو لديه توكن، فهو مسموح له بالمرور
  return isAuthenticated || hasToken ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};
