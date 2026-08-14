import { Phone, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

export default function RequestOtpStep({
  phoneNumber,
  setPhoneNumber,
  handleRequestOtp,
  loading,
  isArabic,
  t,
}) {
  return (
    <form
      onSubmit={handleRequestOtp}
      className="space-y-6"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-on-surface-variant/80 block">
          {t("phoneNumber")}
        </label>
        <div className="relative">
          <span
            className={`absolute inset-y-0 ${isArabic ? "right-4" : "left-4"} flex items-center text-gray-400 pointer-events-none`}
          >
            <Phone size={18} />
          </span>
          <input
            type="text"
            dir="ltr"
            placeholder="+963934206455"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`w-full py-3.5 bg-gray-50/50 border border-border rounded-2xl text-sm font-bold text-on-surface-variant focus:outline-none focus:border-primary focus:bg-white transition-colors shadow-xs ${
              isArabic ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"
            }`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 bg-primary text-white rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <>
            <span>{t("sendOtpCode")}</span>
            {isArabic ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </>
        )}
      </button>
    </form>
  );
}
