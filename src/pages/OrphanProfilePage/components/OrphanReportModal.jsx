import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import { HeartHandshake } from "lucide-react";

// ألوانك المعتمدة
const THEME_COLORS = {
  primary: "#735c00",
  primaryContainer: "#fad564",
  surface: "#f5ede0",
  surfaceLowest: "#ffffff",
  onSurfaceVariant: "#4d4636",
  secondary: "#5c630e",
  tertiary: "#3b674c",
  border: "#d0c6b0",
  error: "#d93025",
  neutral: "#f9f7f4",
  borderSubtle: "#e6e0d5",
};

export default function OrphanReportModal({
  isOpen,
  onClose,
  orphan,
  t,
  lang,
}) {
  const reportRef = useRef();
  const [isSending, setIsSending] = useState(false);

  if (!isOpen || !orphan) return null;

  const handleConfirmAndSend = async () => {
    if (!reportRef.current) return;

    try {
      setIsSending(true);

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
      });

      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob, `orphan-report-${orphan.id}.png`);
        formData.append("orphan_id", orphan.id);
        formData.append("year", new Date().getFullYear());

        await axios.post("/api/reports/annual", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("تم إرسال التقرير بنجاح للكفيل!");
        setIsSending(false);
        onClose();
      }, "image/png");
    } catch (error) {
      console.error("فشل إرسال التقرير:", error);
      alert("حدث خطأ أثناء إرسال التقرير");
      setIsSending(false);
    }
  };

  // دالة مساعدة لعرض الحقول التي تأتي كـ object (ar, en) أو كـ string عادي
  const renderFieldContent = (field) => {
    if (!field) return "-";
    if (typeof field === "object") {
      return (
        <div className="flex justify-between items-center w-full">
          <span>{field.ar || "-"}</span>
          <span className="text-xs text-gray-500 font-normal ltr">
            {field.en || ""}
          </span>
        </div>
      );
    }
    return <span>{field}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div
        className="rounded-3xl p-6 max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl"
        style={{ backgroundColor: THEME_COLORS.surfaceLowest }}
      >
        {/* شريط التحكم العلوي للمودال */}
        <div
          className="flex justify-between items-center mb-4 pb-3 border-b"
          style={{ borderColor: THEME_COLORS.borderSubtle }}
        >
          <h2
            className="text-xl font-bold"
            style={{ color: THEME_COLORS.onSurfaceVariant }}
          >
            {lang === "ar"
              ? "معاينة التقرير السنوي لليتيم"
              : "Annual Orphan Report Preview"}
          </h2>
          <button
            onClick={onClose}
            className="hover:text-red-500 text-xl font-bold px-2 transition-colors"
            style={{ color: THEME_COLORS.onSurfaceVariant }}
          >
            ✕
          </button>
        </div>

        {/* منطقة المعاينة والقالب المستهدف للتصوير */}
        <div
          className="overflow-y-auto flex-1 p-4 rounded-2xl flex justify-center"
          style={{ backgroundColor: THEME_COLORS.neutral }}
        >
          <div
            ref={reportRef}
            className="p-8 w-[800px] shadow-lg rounded-2xl box-border"
            style={{
              backgroundColor: THEME_COLORS.surfaceLowest,
              border: `2px solid ${THEME_COLORS.border}`,
              direction: "rtl",
            }}
          >
            {/* رأس الاستمارة */}
            <div
              className="flex justify-between items-center pb-5 mb-6 border-b-2"
              style={{ borderColor: THEME_COLORS.borderSubtle }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-2xl shadow-sm"
                  style={{
                    backgroundColor: THEME_COLORS.primaryContainer,
                    color: THEME_COLORS.primary,
                  }}
                >
                  <HeartHandshake size={32} />
                </div>
                <div>
                  <h2
                    className="font-extrabold text-lg"
                    style={{ color: THEME_COLORS.primary }}
                  >
                    مؤسسة أثر التنموية
                  </h2>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: THEME_COLORS.onSurfaceVariant }}
                  >
                    Athar Developmental Foundation
                  </p>
                </div>
              </div>
              <div className="text-center">
                <h1
                  className="font-bold text-xl"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  استمارة اليتيم السنوية
                </h1>
                <p
                  className="text-xs font-medium"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  Annual Orphan Report
                </p>
              </div>
            </div>

            {/* جدول البيانات الأساسية */}
            <div
              className="text-sm mb-6 rounded-xl overflow-hidden shadow-sm"
              style={{ border: `1px solid ${THEME_COLORS.border}` }}
            >
              {/* اسم اليتيم */}
              <div
                className="grid grid-cols-12 border-b"
                style={{ borderColor: THEME_COLORS.borderSubtle }}
              >
                <div
                  className="col-span-5 p-3 font-bold border-l"
                  style={{
                    backgroundColor: THEME_COLORS.surface,
                    color: THEME_COLORS.primary,
                    borderColor: THEME_COLORS.borderSubtle,
                  }}
                >
                  اسم اليتيم / Orphan Name
                </div>
                <div
                  className="col-span-7 p-3 font-semibold"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  {orphan.firstName} {orphan.lastName}
                </div>
              </div>

              {/* اسم الأب */}
              <div
                className="grid grid-cols-12 border-b"
                style={{ borderColor: THEME_COLORS.borderSubtle }}
              >
                <div
                  className="col-span-5 p-3 font-bold border-l"
                  style={{
                    backgroundColor: THEME_COLORS.surface,
                    color: THEME_COLORS.primary,
                    borderColor: THEME_COLORS.borderSubtle,
                  }}
                >
                  اسم الأب / Father's Name
                </div>
                <div
                  className="col-span-7 p-3 font-medium"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  {orphan.fatherName}
                </div>
              </div>

              {/* اسم الأم */}
              <div
                className="grid grid-cols-12 border-b"
                style={{ borderColor: THEME_COLORS.borderSubtle }}
              >
                <div
                  className="col-span-5 p-3 font-bold border-l"
                  style={{
                    backgroundColor: THEME_COLORS.surface,
                    color: THEME_COLORS.primary,
                    borderColor: THEME_COLORS.borderSubtle,
                  }}
                >
                  اسم الأم / Mother's Name
                </div>
                <div
                  className="col-span-7 p-3 font-medium"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  {orphan.motherName}
                </div>
              </div>

              {/* اسم الوصي */}
              <div
                className="grid grid-cols-12 border-b"
                style={{ borderColor: THEME_COLORS.borderSubtle }}
              >
                <div
                  className="col-span-5 p-3 font-bold border-l"
                  style={{
                    backgroundColor: THEME_COLORS.surface,
                    color: THEME_COLORS.primary,
                    borderColor: THEME_COLORS.borderSubtle,
                  }}
                >
                  اسم الوصي / Guardian Name
                </div>
                <div
                  className="col-span-7 p-3 font-medium"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  {orphan.guardianName}
                </div>
              </div>

              {/* تاريخ الولادة */}
              <div
                className="grid grid-cols-12 border-b"
                style={{ borderColor: THEME_COLORS.borderSubtle }}
              >
                <div
                  className="col-span-5 p-3 font-bold border-l"
                  style={{
                    backgroundColor: THEME_COLORS.surface,
                    color: THEME_COLORS.primary,
                    borderColor: THEME_COLORS.borderSubtle,
                  }}
                >
                  تاريخ الولادة / Date of Birth
                </div>
                <div
                  className="col-span-7 p-3 font-medium ltr text-right"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  {orphan.birthOfDate ? orphan.birthOfDate.split("T")[0] : ""}
                </div>
              </div>

              {/* الجنس */}
              <div className="grid grid-cols-12">
                <div
                  className="col-span-5 p-3 font-bold border-l"
                  style={{
                    backgroundColor: THEME_COLORS.surface,
                    color: THEME_COLORS.primary,
                    borderColor: THEME_COLORS.borderSubtle,
                  }}
                >
                  الجنس / Gender
                </div>
                <div
                  className="col-span-7 p-3 font-medium uppercase"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  {orphan.gender}
                </div>
              </div>
            </div>

            {/* عنوان القسم التفصيلي */}
            <div
              className="p-3 font-bold text-center text-sm rounded-xl mb-3 shadow-sm"
              style={{
                backgroundColor: THEME_COLORS.primaryContainer,
                color: THEME_COLORS.primary,
              }}
            >
              معلومات تفصيلية — Detailed Information
            </div>

            {/* الحقول التفصيلية (التي تحتوي على ar و en) */}
            <div
              className="text-sm rounded-xl overflow-hidden shadow-sm"
              style={{ border: `1px solid ${THEME_COLORS.border}` }}
            >
              {/* الصف الدراسي */}
              <div
                className="grid grid-cols-12 border-b"
                style={{ borderColor: THEME_COLORS.borderSubtle }}
              >
                <div
                  className="col-span-5 p-3 font-bold border-l"
                  style={{
                    backgroundColor: THEME_COLORS.surface,
                    color: THEME_COLORS.primary,
                    borderColor: THEME_COLORS.borderSubtle,
                  }}
                >
                  الصف الدراسي / Class
                </div>
                <div
                  className="col-span-7 p-3 font-semibold"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  {renderFieldContent(orphan.class)}
                </div>
              </div>

              {/* الحالة الصحية */}
              <div
                className="grid grid-cols-12 border-b"
                style={{ borderColor: THEME_COLORS.borderSubtle }}
              >
                <div
                  className="col-span-5 p-3 font-bold border-l"
                  style={{
                    backgroundColor: THEME_COLORS.surface,
                    color: THEME_COLORS.primary,
                    borderColor: THEME_COLORS.borderSubtle,
                  }}
                >
                  الحالة الصحية / Health Status
                </div>
                <div
                  className="col-span-7 p-3 font-semibold"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  {renderFieldContent(orphan.Diseases)}
                </div>
              </div>

              {/* العنوان الحالي */}
              <div
                className="grid grid-cols-12 border-b"
                style={{ borderColor: THEME_COLORS.borderSubtle }}
              >
                <div
                  className="col-span-5 p-3 font-bold border-l"
                  style={{
                    backgroundColor: THEME_COLORS.surface,
                    color: THEME_COLORS.primary,
                    borderColor: THEME_COLORS.borderSubtle,
                  }}
                >
                  العنوان الحالي / Current Address
                </div>
                <div
                  className="col-span-7 p-3 font-semibold"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  {renderFieldContent(orphan.currentAddress)}
                </div>
              </div>

              {/* العنوان السابق */}
              <div
                className="grid grid-cols-12 border-b"
                style={{ borderColor: THEME_COLORS.borderSubtle }}
              >
                <div
                  className="col-span-5 p-3 font-bold border-l"
                  style={{
                    backgroundColor: THEME_COLORS.surface,
                    color: THEME_COLORS.primary,
                    borderColor: THEME_COLORS.borderSubtle,
                  }}
                >
                  العنوان السابق / Previous Address
                </div>
                <div
                  className="col-span-7 p-3 font-semibold"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  {renderFieldContent(orphan.previousAddress)}
                </div>
              </div>

              {/* الموهبة */}
              <div className="grid grid-cols-12">
                <div
                  className="col-span-5 p-3 font-bold border-l"
                  style={{
                    backgroundColor: THEME_COLORS.surface,
                    color: THEME_COLORS.primary,
                    borderColor: THEME_COLORS.borderSubtle,
                  }}
                >
                  الموهبة / Talent
                </div>
                <div
                  className="col-span-7 p-3 font-semibold"
                  style={{ color: THEME_COLORS.onSurfaceVariant }}
                >
                  {renderFieldContent(orphan.talent)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* أزرار الإجراءات أسفل المودال */}
        <div
          className="flex justify-end gap-3 mt-4 pt-3 border-t"
          style={{ borderColor: THEME_COLORS.borderSubtle }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl transition font-medium"
            style={{
              backgroundColor: THEME_COLORS.surface,
              color: THEME_COLORS.onSurfaceVariant,
            }}
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirmAndSend}
            disabled={isSending}
            className="px-6 py-2 font-bold rounded-xl transition flex items-center gap-2 shadow-sm hover:opacity-90"
            style={{
              backgroundColor: THEME_COLORS.primaryContainer,
              color: THEME_COLORS.primary,
            }}
          >
            {isSending ? "جاري التحويل والإرسال..." : "تأكيد وإرسال للكفيل"}
          </button>
        </div>
      </div>
    </div>
  );
}
