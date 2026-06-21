import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { PrivateRoute } from "@/routes/PrivateRoute";

function App() {
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
