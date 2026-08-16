/* global importScripts, firebase */

// استيراد إصدارات فايربيز الحديثة للـ Service Worker (Modular SDK v10)
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCMwYNRlo_xlSvyqcJMWiYeVqZJ7-usMio",
  authDomain: "association-system-1601d.firebaseapp.com",
  projectId: "association-system-1601d",
  storageBucket: "association-system-1601d.firebasestorage.app",
  messagingSenderId: "335108424121",
  appId: "1:335108424121:web:8d1d1cf07d64adf9ff7668",
});

const messaging = firebase.messaging();

// التعامل مع الإشعارات في الخلفية (Background)
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message: ", payload);

  const notificationTitle =
    payload.notification?.title ||
    payload.data?.titleAr ||
    payload.data?.title ||
    "إشعار جديد";

  const notificationBody =
    payload.notification?.body ||
    payload.data?.messageAr ||
    payload.data?.body ||
    "لديك تنبيه جديد";

  const notificationOptions = {
    body: notificationBody,
    // icon: "/logo192.png", // تأكدي أن الأيقونة موجودة بمجلد public، أو بدليها لرابط صحيح
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});