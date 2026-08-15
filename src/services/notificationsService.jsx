import { API } from "./api"; // عدلي مسار استيراد الـ API حسب مشروعك

export const notificationsService = {
  // 1. جلب قائمة الإشعارات مع دعم الترقيم والفلترة
  getNotifications: async ({ page = 1, limit = 20, isRead } = {}) => {
    const params = { page, limit };
    if (isRead !== undefined) params.isRead = isRead;
    const response = await API.get("/notifications", { params });
    return response.data; // يعيد { data, meta, unreadCount }
  },

  // 2. جلب عدد الإشعارات غير المقروءة فقط
  getUnreadCount: async () => {
    const response = await API.get("/notifications/unread-count");
    return response.data; // يعيد { unreadCount }
  },

  // 3. تحديد إشعار معين كمقروء
  markAsRead: async (id) => {
    const response = await API.patch(`/notifications/${id}/read`);
    return response.data; // يعيد الإشعار المحدث
  },

  // 4. تحديد كل الإشعارات كمقروءة
  markAllAsRead: async () => {
    const response = await API.patch("/notifications/read-all");
    return response.data; // يعيد { success, updatedCount }
  },
};
