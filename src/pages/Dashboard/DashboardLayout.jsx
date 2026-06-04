import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/TopBar";
import { useSelector } from "react-redux";

// احذفي السطور المكررة تماماً

export default function DashboardLayout() {
  const lang = useSelector((state) => state.language?.lang || "en");
  // 2. يجب تعريف isRtl لأنك تستخدمينها في الـ dir
  const isRtl = lang === "ar";

  // دالة الترجمة
  return (
    <div
      className="flex h-screen w-full font-sans overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar />
        {/* اجعلي الـ padding هنا 0 لأن الـ Dashboard يحتوي على p-8 الخاص به */}
        <main className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          {" "}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
