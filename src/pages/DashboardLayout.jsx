import { Outlet } from "react-router-dom";
import Sidebar from "@/pages/Dashboard/components/Sidebar";
import Topbar from "@/pages/Dashboard/components/TopBar";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useNotificationListener } from "@/hooks/useNotificationListener"; // حسب مسار الملف لديكِ
export default function DashboardLayout() {
  const lang =
    useSelector((state) => state.language?.lang) ||
    localStorage.getItem("preferredLang") ||
    "ar";
  const isRtl = lang === "ar";

  useNotificationListener();

  return (
    <div
      className="flex h-screen w-full font-sans overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "16px",
            background: "#333",
            color: "#fff",
          },
        }}
      />{" "}
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar />
        {/* اجعلي الـ padding هنا 0 لأن الـ Dashboard يحتوي على p-8 الخاص به */}
        <main className="flex-1 w-full overflow-y-auto overflow-x-hidden">
          {" "}
          {/* console.log("الـ Routes تعمل الآن!"); */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
