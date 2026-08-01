
export default function ImageModal({ isOpen, onClose, imageUrl ,t}) {
  if (!isOpen) return null;

  return (
    <>
      {/* الـ Overlay */}
      <div
        className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* اللوحة الجانبية مع دعم RTL */}
      <div
        dir="rtl"
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-s border-gray-200 shadow-[0_0_50px_-12px_rgba(0,0,0,0.2)] z-[9999] p-6 flex flex-col animate-in slide-in-from-right duration-300 rounded-s-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* الهيدر */}
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-black text-lg text-gray-800">
            {t("previewImage")}
          </h4>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* منطقة الصورة */}
        <div className="flex-grow flex items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-3xl overflow-hidden p-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="max-w-full max-h-full object-contain rounded-2xl"
              alt="Document"
            />
          ) : (
            <p className="text-gray-400 font-bold">{t("loading")}</p>
          )}
        </div>
      </div>
    </>
  );
}
