import { useState } from "react";
import { FileText, Image as ImageIcon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import ImageModal from "@/pages/OrphanProfilePage/components/ImageModal";

export default function DocumentsCard({ data }) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUrl, setActiveUrl] = useState("");

  // دالة المودال (للصور فقط)
  const openImageModal = (path) => {
    if (!path) return;

    // نفس المنطق المستخدم في FamilyStats بالضبط
    let cleanPath = path.replace(/\\/g, "/").replace(/^uploads\//, "");

    // تأكدي أن هذا الرابط هو نفسه المستخدم في FamilyStats
    setActiveUrl(`http://localhost:3000/uploads/${cleanPath}`);
    setIsModalOpen(true);
  };

  // دالة النافذة (للملفات فقط)
  const openFileWindow = (path) => {
    if (!path) return;
    const cleanPath = path.replace(/\\/g, "/").replace(/^uploads\//, "");
    const fullUrl = `http://localhost:3000/uploads/${cleanPath}`;
    window.open(
      fullUrl,
      "_blank",
      "width=1000,height=800,scrollbars=yes,resizable=yes",
    );
  };
  console.log("البيانات الواصلة:", data);
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-border/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-border hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out flex-grow group">
      <h3 className="text-lg font-black text-primary mb-6">{t("documents")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* الزر الأول: مثبت دائماً للمودال (الصورة) */}
        <button
          onClick={() => openImageModal(data.personalPhoto)}
          className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary transition-all"
        >
          <ImageIcon className="text-primary" />
          <span className="font-bold">{t("personalPhoto")}</span>
        </button>

        {/* الزر الثاني: مثبت دائماً للنافذة (الملف) */}
        <button
          onClick={() => openFileWindow(data.familyStatement)}
          className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary transition-all"
        >
          <FileText className="text-primary" />
          <span className="font-bold">{t("viewFamilyStatement")}</span>
        </button>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={activeUrl}
      />
    </div>
  );
}
