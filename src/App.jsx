import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { fetchEmployees, fetchRoles } from "@/store/index";
import { useEffect, useDispatch } from "react";
function App() {
  const dispatch = useDispatch();
  // في App.js
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // جلب البيانات مرة واحدة فقط عند تحميل التطبيق
      dispatch(fetchEmployees({}));
      dispatch(fetchRoles());
    }
  }, [dispatch]); // أزلت lang من المصفوفة لأن الـ Interceptor الخاص بالـ API هو من يقرأ اللغة من localStorage
  return (
    <BrowserRouter>
      <PrivateRoute>
        {/* تأكدي من وضعه هنا داخل BrowserRouter */}
        <AppRoutes />
      </PrivateRoute>
    </BrowserRouter>
  );
}
export default App;
