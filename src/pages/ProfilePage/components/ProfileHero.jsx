import { Sparkles, KeyRound, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/store/authSlice";
import { useState } from "react";
import { useRef } from "react";

export function ProfileHero({ profileData, t, lang }) {
  const isRtl = lang === "ar";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isLockedRef = useRef(false);

  const handleConfirmLogout = () => {
    if (isLockedRef.current) return;
    isLockedRef.current = true;

    // تفعيل قفل الحراسة لكي لا يتدخل الـ PrivateRoute ويطردك
    localStorage.setItem("isLoggingOut", "true");
    setIsLoggingOut(true);

    setTimeout(async () => {
      try {
        await dispatch(logoutUser()).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        localStorage.clear();
        window.location.replace("/login");
      }
    }, 2000);
  };
  return (
    <>
      <div className="lg:col-span-5 xl:col-span-4 bg-surface-lowest rounded-3xl border border-border/80 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative group">
        <div className="h-36 w-full bg-gradient-to-r from-primary/30 via-primary/10 to-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center]" />
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-primary/20 rounded-full blur-2xl" />
        </div>

        <div className="px-6 pb-6 relative flex flex-col items-center text-center gap-5 -mt-20">
          <div className="relative group/avatar">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/40 rounded-3xl blur-md opacity-30 group-hover/avatar:opacity-75 transition duration-500" />
            <img
              src={profileData.personalPhoto}
              alt={profileData.fullName}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover bg-surface border-4 border-surface-lowest shadow-xl transition-all duration-300 group-hover/avatar:scale-[1.02]"
            />
          </div>

          <div className="flex flex-col items-center gap-2 w-full">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-wide uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                {t(profileData.userType?.toLowerCase()) || profileData.userType}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight w-full break-words">
              {profileData.fullName}
            </h1>
          </div>

          <div className="w-full pt-1">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-black text-emerald-700">
                {profileData.roles?.length || 0}{" "}
                {t("rolesCount") || "صلاحيات وأدوار مخصصة"}
              </span>
            </div>
          </div>

          <hr className="w-full border-border/60 my-1" />

          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-surface hover:bg-error/10 text-slate-700 hover:text-error text-sm font-bold transition-all duration-200 border border-border hover:border-error/30 shadow-xs hover:shadow-sm w-full cursor-pointer active:scale-95 group/btn"
          >
            <LogOut className="w-4 h-4 shrink-0 transition-transform group-hover/btn:-translate-x-0.5" />
            <span>{t("logout") || "تسجيل الخروج"}</span>
          </button>
        </div>
      </div>

      {/* نافذة التأكيد */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 text-center">
            <h3 className="text-lg font-bold text-slate-900">
              {isRtl ? "تسجيل الخروج" : "Logout"}
            </h3>
            <p className="text-sm text-slate-600">
              {isRtl
                ? "هل أنت متأكد أنك تريد تسجيل الخروج من النظام؟"
                : "Are you sure you want to log out of the system?"}
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isRtl ? "إلغاء" : "Cancel"}
              </button>
              <button
                onClick={handleConfirmLogout}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold transition-colors cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isRtl ? "جاري..." : "Loading..."}</span>
                  </>
                ) : (
                  <span>{isRtl ? "تأكيد" : "Confirm"}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
