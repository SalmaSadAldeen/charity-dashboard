import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { messaging } from '@/firebase';
import toast from 'react-hot-toast'; // أو أي مكتبة تستانس بها للتنبيهات

export const useNotificationListener = () => {
  useEffect(() => {
    // الاستماع للإشعارات القادمة من فايربيز لحظياً وأنتِ فاتحة الموقع
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('📬 وصل إشعار جديد:', payload);

      // استخراج العنوان والرسالة (حسب البيانات المرسلة من السيرفر)
      const title = payload.data?.titleAr || payload.notification?.title || 'إشعار جديد';
      const message = payload.data?.messageAr || payload.notification?.body || '';

      // إظهار نافذة منبثقة (Toast Popup) على الشاشة فوراً!
      toast.success(
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>,
        {
          duration: 5000, // تضل ظاهرة لمدة 5 ثوانٍ
          position: 'top-left', // مكان ظهور النافذة (حسب رغبتك)
        }
      );
    });

    return () => unsubscribe();
  }, []);
};