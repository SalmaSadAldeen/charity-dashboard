import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { messaging } from '@/firebase';
import toast from 'react-hot-toast';

export const useNotificationListener = () => {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('📬 وصل إشعار جديد وأنتِ داخل التطبيق:', payload);

      // قراءة العنوان والنص بدقة من الـ notification أو الـ data
      const title = 
        payload.notification?.title || 
        payload.data?.titleAr || 
        payload.data?.title || 
        'إشعار جديد';

      const message = 
        payload.notification?.body || 
        payload.data?.messageAr || 
        payload.data?.body || 
        '';

      toast.success(
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>,
        {
          duration: 5000,
          position: 'top-left',
        }
      );
    });

    return () => unsubscribe();
  }, []);
};