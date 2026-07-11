import { useTranslation } from "@/hooks/useTranslation";

const RememberMeToggle = ({ checked, onToggle }) => {
  const { t, lang } = useTranslation();
  const isRtl = lang === "ar";

  return (
    <div
      className={`flex items-center pt-1 ${isRtl ? "space-x-reverse space-x-3" : "space-x-3"}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 focus:outline-none overflow-hidden ${
          checked ? "bg-[#7c766c]" : "bg-[#d5cfc5]"
        }`}
      >
        <div
          className={`bg-surface-lowest w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            checked
              ? isRtl
                ? "-translate-x-5"
                : "translate-x-5"
              : "translate-x-0"
          }`}
        />
      </button>
      <span className="text-xs text-[#6e685e] select-none">
        {t("keepMeLoggedIn")}
      </span>
    </div>
  );
};

export default RememberMeToggle;
