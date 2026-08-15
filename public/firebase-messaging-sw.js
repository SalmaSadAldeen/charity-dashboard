/* global firebase, importScripts */
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCMwYNRlo_xlSvyqcJMWiYeVqZJ7-usMio",
  authDomain: "association-system-1601d.firebaseapp.com",
  projectId: "association-system-1601d",
  storageBucket: "association-system-1601d.firebasestorage.app",
  messagingSenderId: "335108424121",
  appId: "1:335108424121:web:8d1d1cf07d64adf9ff7668",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message: ", payload);

  // قراءة العنوان والنص سواء كانت داخل notification أو data
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
    icon: "/logo192.png",
    data: payload.data, // حفظ البيانات لاستخدامها لاحقاً عند النقر على الإشعار
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});