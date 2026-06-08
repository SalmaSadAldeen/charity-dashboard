import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      {/* تأكدي من وضعه هنا داخل BrowserRouter */}
      <AppRoutes />
    </BrowserRouter>
  );
}
export default App;
