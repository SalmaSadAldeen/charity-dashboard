import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { createPortal } from "react-dom";
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
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const { list, unreadCount, loading } = useSelector(
    (state) => state.notifications,
  );

  const isRTL = lang === "ar";

  // دالة حساب الموقع بدقة فورية
  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 360;
      const screenPadding = 16;

      const buttonCenter = rect.left + rect.width / 2;
      let leftPosition = buttonCenter - dropdownWidth / 2;

      if (leftPosition < screenPadding) {
        leftPosition = screenPadding;
      }

      if (leftPosition + dropdownWidth > window.innerWidth - screenPadding) {
        leftPosition = window.innerWidth - dropdownWidth - screenPadding;
      }

      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: leftPosition,
      });
    }
  };

  // استخدام useLayoutEffect بدلاً من useEffect لتنفيذ الحساب قبل رسم الشاشة ومنع الوميض
  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, lang]);

  useEffect(() => {
    dispatch(fetchUnreadCount());
  }, [lang, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideButton =
        buttonRef.current && !buttonRef.current.contains(event.target);
      const isOutsideDropdown =
        dropdownRef.current && !dropdownRef.current.contains(event.target);

      if (isOutsideButton && isOutsideDropdown) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleDropdown = () => {
    const nextState = !isOpen;
    if (nextState) {
      updatePosition(); // احسب المكان فوراً قبل فتح الحالة
    }
    setIsOpen(nextState);

    if (nextState) {
      dispatch(
        fetchNotifications({
          page: 1,
          limit: 15,
          isRead: filter === "unread" ? false : undefined,
        }),
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
      }),
    );
  };
  const handleNotificationClick = (item) => {
    const { targetType, targetId } = item;

    // 1. تعليم الإشعار كمقروء
    if (!item.isRead) {
      dispatch(markAsRead(item.id));
    }

    // 2. التوجيه المباشر حسب نوع الإشعار
    if (targetId) {
      switch (targetType) {
        case "BENEFICIARY_REVIEW":
        case "NEW_BENEFICIARY":
          navigate(`/dashboard/beneficiaries/${targetId}`);
          break;
        case "HELP_REQUEST_REVIEW":
        case "NEW_HELP_REQUEST":
        case "AID_REQUEST_REVIEW":
          navigate(`/dashboard/help-requests/${targetId}`);
          break;
        case "NEW_SPONSORSHIP_REQUEST":
        case "SPONSORSHIP_REQUEST":
        case "SPONSORSHIP_REVIEW":
        case "ACCEPTED_SPONSORSHIP_CANCELLED":
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
    }

    // 3. إغلاق القائمة في النهاية بعد بدء الانتقال
    setIsOpen(false);
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
      className="relative inline-flex items-center text-left"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <button
        ref={buttonRef}
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

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              zIndex: 999999,
              visibility: dropdownPosition.top === 0 ? "hidden" : "visible", // إخفاء تام للحظة الحساب حتى لا تظهر في زاوية الشاشة الخاطئة
            }}
          >
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
          </div>,
          document.body,
        )}
    </div>
  );
}
