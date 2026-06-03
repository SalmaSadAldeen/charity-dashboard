// LanguageContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { translations } from "./translations"; // استيراد جدول الترجمة المفصول هنا

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en"); // اللغة الافتراضية هي الإنجليزية

  // معالجة قلب اتجاه المتصفح تلقائياً بناءً على اللغة
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  // دالة التبديل بين اللغتين
  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  // دالة الترجمة الذكية الذكية للكلمات
  const t = (key) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
