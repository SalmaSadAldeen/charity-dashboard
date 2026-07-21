import { useState } from "react";
import {
  FileText,
  ExternalLink,
  Paperclip,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
} from "lucide-react";

export const RequestAttachmentsCard = ({ mediaUrls, t, lang }) => {
  const isRTL = lang === "ar";
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // عكس أزرار المعرض حسب اللغة
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  if (!mediaUrls || mediaUrls.length === 0) {
    return (
      <div className="bg-surface-lowest p-8 rounded-3xl border border-border/60 text-center text-on-surface-variant text-xs font-bold space-y-2 shadow-sm">
        <Paperclip className="w-8 h-8 mx-auto text-on-surface-variant/40 stroke-[1.5]" />
        <p>
          {t?.("no_attachments") ||
            t?.("noAttachments") ||
            "لا توجد مرفقات مع هذا الطلب."}
        </p>
      </div>
    );
  }

  const processedAttachments = mediaUrls.map((rawUrl) => {
    let cleanPath = rawUrl.replace(/\\/g, "/").replace(/^uploads\//, "");
    const fullUrl = `http://localhost:3000/uploads/${cleanPath}`;
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(cleanPath);
    return { rawUrl, cleanPath, fullUrl, isImage };
  });

  const imagesList = processedAttachments.filter((att) => att.isImage);

  const handleOpenAttachment = (att) => {
    if (att.isImage) {
      const imgIndexInList = imagesList.findIndex(
        (item) => item.fullUrl === att.fullUrl,
      );
      setSelectedImageIndex(imgIndexInList !== -1 ? imgIndexInList : 0);
    } else {
      window.open(att.fullUrl, "_blank");
    }
  };

  const handleDownload = async (e, url, fileName) => {
    e.stopPropagation();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "attachment";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(url, "_blank");
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : imagesList.length - 1,
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev < imagesList.length - 1 ? prev + 1 : 0,
    );
  };

  const currentActiveImage =
    selectedImageIndex !== null ? imagesList[selectedImageIndex] : null;

  return (
    <div
      className={`bg-surface-lowest p-6 rounded-3xl border border-border/60 space-y-5 shadow-sm transition-all ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* عنوان البطاقة والعدد */}
      <div className="flex items-center justify-between pb-3 border-b border-border/40">
        <h4 className="text-xs font-black text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
          <Paperclip className="w-4 h-4 text-primary" />
          {t?.("attachments") || "المرفقات والملفات والوثائق"}
        </h4>
        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
          {mediaUrls.length}
        </span>
      </div>

      {/* شبكة عرض المرفقات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {processedAttachments.map((att, index) => (
          <div
            key={index}
            onClick={() => handleOpenAttachment(att)}
            className={`group relative flex flex-col justify-between p-3.5 bg-surface-lowest hover:bg-surface/50 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-md ${
              currentActiveImage?.fullUrl === att.fullUrl
                ? "border-primary ring-2 ring-primary/20"
                : "border-border/60 hover:border-primary/30"
            }`}
          >
            {att.isImage ? (
              <div className="w-full h-36 rounded-xl overflow-hidden mb-3 bg-surface/50 relative border border-border/60">
                <img
                  src={att.fullUrl}
                  alt={`Attachment ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-on-surface/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-on-surface drop-shadow-md" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 py-3 px-1 mb-2">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300 border border-primary/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-xs font-black text-on-surface truncate">
                    {t?.("attachment") || "مرفق"} #{index + 1}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium truncate">
                    {att.cleanPath.split("/").pop()}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2.5 border-t border-border/60 text-on-surface-variant">
              <span className="text-[11px] font-bold text-on-surface">
                {t?.("attachment") || "مرفق"} #{index + 1}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  title={t?.("download") || "تنزيل"}
                  onClick={(e) =>
                    handleDownload(
                      e,
                      att.fullUrl,
                      att.cleanPath.split("/").pop(),
                    )
                  }
                  className="p-1.5 hover:bg-primary/10 text-on-surface-variant hover:text-primary rounded-lg transition-colors border border-transparent hover:border-primary/20"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <ExternalLink className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* معرض تكبير الصورة المنسجم (بدون أسود غامق) */}
      {currentActiveImage && (
        <div className="relative mt-5 bg-surface-lowest rounded-3xl p-4 sm:p-5 overflow-hidden shadow-xl border border-border/80 transition-all animate-in fade-in duration-300 space-y-4">
          {/* شريط معلومات المعرض والأزرار */}
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-xl border border-primary/20">
              {selectedImageIndex + 1} / {imagesList.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) =>
                  handleDownload(
                    e,
                    currentActiveImage.fullUrl,
                    currentActiveImage.cleanPath.split("/").pop(),
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl transition-all text-xs font-bold border border-primary/20"
                title={t?.("download") || "تنزيل"}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {t?.("download") || "تنزيل"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                className="p-1.5 hover:bg-error/10 text-on-surface-variant hover:text-error rounded-xl transition-colors border border-border/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* حاوية عرض الصورة */}
          <div className="relative flex items-center justify-center min-h-[280px] max-h-[450px] bg-surface/50 rounded-2xl overflow-hidden border border-border/60 p-2">
            <img
              src={currentActiveImage.fullUrl}
              alt="Expanded preview"
              className="max-h-[420px] w-auto max-w-full object-contain rounded-xl shadow-sm"
            />

            {imagesList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-surface-lowest/90 hover:bg-primary text-on-surface hover:text-white rounded-full transition-all shadow-md backdrop-blur-md border border-border/80"
                >
                  <PrevIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-surface-lowest/90 hover:bg-primary text-on-surface hover:text-white rounded-full transition-all shadow-md backdrop-blur-md border border-border/80"
                >
                  <NextIcon className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAttachmentsCard;
