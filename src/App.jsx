import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { fetchEmployees, fetchRoles } from "@/store/index";
import { useEffect, useDispatch } from "react";
import { useTranslation } from "@/hooks/useTranslation"; // استيراد الهوك الخاص باللغة
function App() {
  console.log("المسارات المتاحة:", window.location.pathname);
  const dispatch = useDispatch();
  // App.js
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // جلب البيانات مرة واحدة فقط عند فتح التطبيق
  //     dispatch(fetchEmployees({}));
  //     dispatch(fetchRoles());
  //   }
  // }, [dispatch]); // بدون lang هناأضفنا lang هنا!
  return (
    <BrowserRouter>
      <PrivateRoute>
        <AppRoutes />
      </PrivateRoute>
    </BrowserRouter>
  );
}
export default App;
