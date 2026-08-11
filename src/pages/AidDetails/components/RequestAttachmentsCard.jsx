import { useState } from "react";
import {
  FileText,
  
  Paperclip,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
} from "lucide-react";

export const RequestAttachmentsCard = ({ mediaUrls, t, lang }) => {
  const isRTL = lang === "ar";
  const [selectedIndex, setSelectedIndex] = useState(null);

  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  if (!mediaUrls?.length) {
    return (
      <div className="bg-surface-lowest p-8 rounded-3xl border border-border/60 text-center text-on-surface-variant text-xs font-bold space-y-2 shadow-sm">
        <Paperclip className="w-8 h-8 mx-auto text-on-surface-variant/40 stroke-[1.5]" />
        <p>{t?.("no_attachments") || t?.("noAttachments") || "لا توجد مرفقات مع هذا الطلب."}</p>
      </div>
    );
  }

  const attachments = mediaUrls.map((rawUrl) => {
    const cleanPath = rawUrl.replace(/\\/g, "/").replace(/^uploads\//, "");
    return {
      rawUrl,
      cleanPath,
      name: cleanPath.split("/").pop(),
      fullUrl: `http://localhost:3000/uploads/${cleanPath}`,
      isImage: /\.(jpg|jpeg|png|gif|webp)$/i.test(cleanPath),
    };
  });

  const images = attachments.filter((item) => item.isImage);

  const handleDownload = async (e, url, fileName) => {
    e.stopPropagation();
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "attachment";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  const handleNavigate = (e, direction) => {
    e.stopPropagation();
    setSelectedIndex((prev) => 
      direction === "next" 
        ? (prev < images.length - 1 ? prev + 1 : 0) 
        : (prev > 0 ? prev - 1 : images.length - 1)
    );
  };

  const activeImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <div className={`bg-surface-lowest p-6 rounded-3xl border border-border/60 space-y-5 shadow-sm transition-all ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      
      {/* رأس البطاقة */}
      <div className="flex items-center justify-between pb-3 border-b border-border/40">
        <h4 className="text-xs font-black text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
          <Paperclip className="w-4 h-4 text-primary" />
          {t?.("attachments") || "المرفقات والملفات والوثائق"}
        </h4>
        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
          {mediaUrls.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {attachments.map((att, index) => {
          const imgIndex = images.findIndex((img) => img.fullUrl === att.fullUrl);
          
          return (
            <div
              key={index}
              onClick={() => att.isImage && imgIndex !== -1 ? setSelectedIndex(imgIndex) : window.open(att.fullUrl, "_blank")}
              className={`group relative flex flex-col justify-between p-3.5 bg-surface-lowest hover:bg-surface/50 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-md ${
                activeImage?.fullUrl === att.fullUrl ? "border-primary ring-2 ring-primary/20" : "border-border/60 hover:border-primary/30"
              }`}
            >
              {att.isImage ? (
                <div className="w-full h-36 rounded-xl overflow-hidden mb-3 bg-surface/50 relative border border-border/60">
                  <img src={att.fullUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
                    <span className="text-xs font-black text-on-surface truncate">{t?.("attachment") || "مرفق"} #{index + 1}</span>
                    <span className="text-[10px] text-on-surface-variant font-medium truncate">{att.name}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2.5 border-t border-border/60 text-on-surface-variant">
                <span className="text-[11px] font-bold text-on-surface">{t?.("attachment") || "مرفق"} #{index + 1}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    title={t?.("download") || "تنزيل"}
                    onClick={(e) => handleDownload(e, att.fullUrl, att.name)}
                    className="p-1.5 hover:bg-primary/10 text-on-surface-variant hover:text-primary rounded-lg transition-colors border border-transparent hover:border-primary/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeImage && (
        <div className="relative mt-5 bg-surface-lowest rounded-3xl p-4 sm:p-5 shadow-xl border border-border/80 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-xl border border-primary/20">
              {selectedIndex + 1} / {images.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => handleDownload(e, activeImage.fullUrl, activeImage.name)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl transition-all text-xs font-bold border border-primary/20"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{t?.("download") || "تنزيل"}</span>
              </button>
              <button type="button" onClick={() => setSelectedIndex(null)} className="p-1.5 hover:bg-error/10 text-on-surface-variant hover:text-error rounded-xl border border-border/60">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center min-h-[280px] max-h-[450px] bg-surface/50 rounded-2xl overflow-hidden border border-border/60 p-2">
            <img src={activeImage.fullUrl} alt="" className="max-h-[420px] w-auto max-w-full object-contain rounded-xl shadow-sm" />
            
            {images.length > 1 && (
              <>
                <button type="button" onClick={(e) => handleNavigate(e, "prev")} className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-surface-lowest/90 hover:bg-primary text-on-surface hover:text-white rounded-full shadow-md border border-border/80">
                  <PrevIcon className="w-4 h-4" />
                </button>
                <button type="button" onClick={(e) => handleNavigate(e, "next")} className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-surface-lowest/90 hover:bg-primary text-on-surface hover:text-white rounded-full shadow-md border border-border/80">
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