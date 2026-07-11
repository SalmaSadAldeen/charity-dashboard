export default function AppButton({
  isLoading,
  text,
  loadingText,
  onClick,
  type = "submit",
}) {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className={`
        w-full font-black py-6 rounded-[2rem] transition-all duration-300 
        shadow-xl shadow-[#e6c25a]/10 border border-white/20
        hover:shadow-2xl hover:shadow-[#e6c25a]/20 active:scale-[0.98]
        ${
          isLoading
            ? "bg-[#d0c6b0] cursor-not-allowed opacity-70"
            : "bg-[#e6c25a] hover:bg-[#8c7200] text-white"
        }
      `}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          {loadingText || "Saving..."}
        </span>
      ) : (
        <span className="text-lg uppercase tracking-[0.2em]">{text}</span>
      )}
    </button>
  );
}
