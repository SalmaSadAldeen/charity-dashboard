import { useState, useEffect } from "react";

/**
 * هوك عام لمنع ومضة اللودر السريعة (Flicker)
 * @param {boolean} isLoading - هل التطبيق بحالة تحميل حالياً؟
 * @param {number} delay - المدة بالملي ثانية التي يجب انتظارها قبل إظهار اللودر (الافتراضي 300)
 * @returns {boolean} - هل يجب إظهار اللودر فعلياً أم لا؟
 */
export function useDelayedLoading(isLoading, delay = 300) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer;

    if (isLoading) {
      // ابدأ العد التنازلي قبل إظهار اللودر
      timer = setTimeout(() => {
        setShowLoader(true);
      }, delay);
    } else {
      // أول ما ينتهي التحميل، اخفِ اللودر فوراً
      setShowLoader(false);
    }

    // تنظيف المؤقت إذا تغيرت الحالة بسرعة لمنع تسريب الذاكرة (Memory Leak)
    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showLoader;
}
