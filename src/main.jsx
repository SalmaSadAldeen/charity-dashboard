import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
// import LoginPage from "./pages/Login/LoginPage";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // 1. أضيفي هذا
import AppRoutes from "./routes/AppRoutes"; // 2. استدعي ملف المسارات

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {" "}
        {/* 3. غلفي التطبيق بالراوتر */}
        <AppRoutes /> 
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
