import { useSelector } from "react-redux";
import { translations } from "@/context/translations";

export default function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  // احذفي t من هنا

  const lang = useSelector((state) => state.language.lang);
  const t = (key) => translations[lang][key] || key; // تعريف واحد فقط لـ t

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-96 text-center">
        <h3 className="text-xl font-bold text-red-600 mb-4">
          {t("deleteConfirmTitle")}
        </h3>
        <p className="mb-6">{t("deleteConfirmMessage")}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 rounded-xl"
          >
            {t("cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-xl"
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
