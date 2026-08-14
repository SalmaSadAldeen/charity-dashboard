import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { PrivateRoute } from "@/routes/PrivateRoute";

function App() {
  console.log("المسارات المتاحة:", window.location.pathname);

  return (
    <BrowserRouter>
      <PrivateRoute>
        <AppRoutes />
      </PrivateRoute>
    </BrowserRouter>
  );
}

export default App;
