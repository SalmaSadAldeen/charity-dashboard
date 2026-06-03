import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
// import LoginPage from "./pages/Login/LoginPage";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import "./index.css";
import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <Provider store={store}>
        {/* <LoginPage /> */}
        <DashboardLayout />
      </Provider>
    </LanguageProvider>
  </React.StrictMode>,
);
