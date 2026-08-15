import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import {
  fetchNotifications,
  fetchUnreadCount,
  markAsRead,
  markAllAsRead,
} from "@/store/notificationsSlice.jsx";
import NotificationsDropdown from "@/pages/NotificationBell/components/NotificationsDropdown";

export default function NotificationBell() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const dropdownRef = useRef(null);

  const { list, unreadCount, loading } = useSelector(
    (state) => state.notifications
  );

  const isRTL = lang === "ar";

  // جلب عداد غير المروءة فقط عند تحميل الداشبورد لأول مرة
  useEffect(() => {
    dispatch(fetchUnreadCount());
  }, [lang, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleDropdown = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    // جلب البيانات حصرياً عند الضغط على زر الجرس (Lazy Loading)
    if (nextState) {
      dispatch(
        fetchNotifications({
          page: 1,
          limit: 15,
          isRead: filter === "unread" ? false : undefined,
        })
      );
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    dispatch(
      fetchNotifications({
        page: 1,
        limit: 15,
        isRead: newFilter === "unread" ? false : undefined,
      })
    );
  };

  // الانتقال السلس والاحترافي مع مهلة بسيطة لانسدال القائمة بسلاسة
  const handleNotificationClick = (item) => {
    if (!item.isRead) {
      dispatch(markAsRead(item.id));
    }
    setIsOpen(false);

    const { targetType, targetId } = item;
    if (!targetId) return;

    // مهلة زمنية دقيقة جداً (80ms) لتفادي أي تقطيع بصري أثناء توجيه الصفحة
    setTimeout(() => {
      switch (targetType) {
        case "BENEFICIARY_REVIEW":
        case "NEW_BENEFICIARY":
          navigate(`/dashboard/beneficiaries/${targetId}`);
          break;

        case "HELP_REQUEST_REVIEW":
        case "NEW_HELP_REQUEST":
          navigate(`/dashboard/help-requests/${targetId}`);
          break;

        case "NEW_SPONSORSHIP_REQUEST":
        case "SPONSORSHIP_REQUEST":
          navigate(`/dashboard/sponsorships/${targetId}`);
          break;

        case "DONOR_CANCELLED_SPONSORSHIP":
        case "AUTOMATIC_SPONSORSHIP_CANCELLED":
        case "SPONSORSHIP_CANCELLED":
          navigate(`/dashboard/sponsorships/${targetId}`);
          break;

        case "ANNUAL_REPORT_REQUIRED":
        case "ORPHAN_UPDATE_REQUIRED":
        case "SPONSORSHIP_REPORT":
          navigate(`/dashboard/orphan/details/${targetId}`);
          break;

        default:
          break;
      }
    }, 80);
  };

  const handleMarkAll = () => {
    dispatch(markAllAsRead());
  };

  const filteredList = list.filter((item) => {
    if (filter === "unread") return !item.isRead;
    return true;
  });

  return (
    <div
      className="relative inline-flex items-center text-left z-50"
      ref={dropdownRef}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* زر الجرس */}
      <button
        onClick={handleToggleDropdown}
        className="relative p-2.5 rounded-full text-surface-lowest/90 hover:text-surface-lowest hover:bg-primary-container/20 focus:outline-none transition-all duration-200"
        aria-label={t("notifications")}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] text-surface-lowest font-bold shadow-sm">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* قائمة الإشعارات */}
      {isOpen && (
        <NotificationsDropdown
          list={filteredList}
          unreadCount={unreadCount}
          loading={loading}
          filter={filter}
          onFilterChange={handleFilterChange}
          onMarkAll={handleMarkAll}
          onItemClick={handleNotificationClick}
          isRTL={isRTL}
        />
      )}
    </div>
  );
}