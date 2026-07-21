import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Eye } from "lucide-react";
import ImageModal from "./ImageModal"; // استيراد المودال
export default function FamilyStats({ orphan }) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUrl, setActiveUrl] = useState("");

  const handleOpen = () => {
    if (!orphan.FamilyStatement) return;

    // 1. تنظيف المسار
    let cleanPath = orphan.FamilyStatement.replace(/\\/g, "/").replace(
      /^uploads\//,
      "",
    );
    const fullUrl = `http://localhost:3000/uploads/${cleanPath}`;

    // 2. الاختبار: هل هو صورة؟ (نختبر اللاحقة)
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(cleanPath);

    if (isImage) {
      // إذا كانت صورة: افتحي المودال (كما هو شغال عندك)
      setActiveUrl(fullUrl);
      setIsModalOpen(true);
    } else {
      // إذا كان ملفاً (PDF مثلاً): افتحيه في نافذة جديدة
      window.open(
        fullUrl,
        "_blank",
        "width=1000,height=800,scrollbars=yes,resizable=yes",
      );
    }
  };
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)] space-y-6">
      <h3 className="font-black text-xl text-gray-900">{t("familyInfo")}</h3>
      <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
        <p className="text-[10px] uppercase font-black tracking-widest text-primary/70 mb-1">
          {t("siblingsCount")}
        </p>
        <span className="font-black text-gray-800 px-5 py-1 rounded-xl text-lg">
          {orphan.brotherAndSisterNumber}
        </span>
      </div>

      {orphan.FamilyStatement && (
        <button
          onClick={handleOpen}
          className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-md"
        >
          <Eye size={20} /> {t("viewFamilyStatement")}
        </button>
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={activeUrl}
      />
    </div>
  );
}
