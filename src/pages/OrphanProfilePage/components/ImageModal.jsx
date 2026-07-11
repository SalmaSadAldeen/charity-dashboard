export default function ImageModal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white font-black text-lg hover:text-gray-300"
        >
           (X)
        </button>
        <img
          src={imageUrl}
          alt="Family Statement"
          className="w-full h-auto max-h-[80vh] object-contain rounded-3xl shadow-2xl"
        />
      </div>
    </div>
  );
}
