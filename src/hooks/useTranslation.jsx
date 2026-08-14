import { useSelector } from "react-redux";
import { translations } from "@/context/translations";

export const useTranslation = () => {
  const lang =
    useSelector((state) => state.language?.lang) ||
    localStorage.getItem("preferredLang") ||
    "ar";
  const t = (key) => translations[lang][key] || key;
  return { t, lang };
};
