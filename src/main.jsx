import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
// import LoginPage from "./pages/Login/LoginPage";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // 1. أضيفي هذا
import AppRoutes from "./routes/AppRoutes"; // 2. استدعي ملف المسارات
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {" "}
        {/* 3. غلفي التطبيق بالراوتر */}
        <AppRoutes /> 4. ضعي المسارات هنا
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
