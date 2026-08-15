import { useTranslation } from "@/hooks/useTranslation";
import NotificationItem from "./NotificationItem";

export default function NotificationsDropdown({
  list,
  unreadCount,
  loading,
  filter,
  onFilterChange,
  onMarkAll,
  onItemClick,
  isRTL,
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`absolute top-full mt-2.5 w-[380px] max-w-[92vw] rounded-2xl bg-surface-lowest shadow-2xl ring-1 ring-border/50 z-[9999] overflow-hidden flex flex-col border border-border transform transition-all duration-300 ease-out origin-top-right animate-in fade-in zoom-in-95 ${
        isRTL ? "right-0 sm:right-auto sm:left-0" : "right-0 sm:right-0 sm:left-auto"
      }`}
    >
      {/* رأس القائمة */}
      <div className="px-4 py-3.5 bg-surface border-b border-border flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary text-sm sm:text-base">
            {t("notifications")}
          </span>
          {unreadCount > 0 && (
            <span className="bg-error/10 text-error text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              {unreadCount} {t("new")}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAll}
            className="text-xs text-primary hover:text-secondary font-semibold transition-colors bg-primary-container/30 hover:bg-primary-container/60 px-2.5 py-1 rounded-lg"
          >
            {t("markAllAsRead")}
          </button>
        )}
      </div>

      {/* شريط الفلترة */}
      <div className="flex bg-surface p-1.5 gap-2 border-b border-border">
        <button
          onClick={() => onFilterChange("all")}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            filter === "all"
              ? "bg-primary text-surface-lowest shadow-sm"
              : "text-on-surface-variant hover:bg-primary-container/40 hover:text-primary"
          }`}
        >
          {t("all")} ({list.length})
        </button>
        <button
          onClick={() => onFilterChange("unread")}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            filter === "unread"
              ? "bg-primary text-surface-lowest shadow-sm"
              : "text-on-surface-variant hover:bg-primary-container/40 hover:text-primary"
          }`}
        >
          {t("unread")} ({unreadCount})
        </button>
      </div>

      {/* قائمة العناصر مع الـ Skeleton الاحترافي */}
      <div className="max-h-[400px] overflow-y-auto bg-surface-lowest [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary-container">
        {loading && list.length === 0 ? (
          <div className="p-4 flex flex-col gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-surface/55 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-border/40 shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 bg-border/40 rounded w-3/4" />
                  <div className="h-2.5 bg-border/30 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="p-10 text-center text-sm text-on-surface-variant flex flex-col items-center gap-2 opacity-70">
            <svg className="w-10 h-10 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            {t("noNotifications")}
          </div>
        ) : (
          list.map((item, index) => (
            <NotificationItem
              key={item.id}
              item={item}
              isRTL={isRTL}
              onClick={() => onItemClick(item)}
              isLast={index === list.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}