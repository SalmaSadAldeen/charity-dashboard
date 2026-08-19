import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/firebase";
import toast from "react-hot-toast";

export const useNotificationListener = () => {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("🔥 [PUSH NOTIFICATION RECEIVED]:", payload);
      console.log(
        "📌 Title:",
        payload.notification?.title || payload.data?.title,
      );
      console.log(
        "💬 Body:",
        payload.notification?.body || payload.data?.messageAr,
      );

      const title =
        payload.notification?.title || payload.data?.title || "إشعار فوري جديد";
      const message = payload.notification?.body || payload.data?.body || "";

      toast.success(
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>,
        {
          duration: 5000,
          position: "top-left",
        },
      );
    });

    return () => unsubscribe();
  }, []);
};
