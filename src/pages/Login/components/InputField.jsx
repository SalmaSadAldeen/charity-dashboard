import { useTranslation } from "@/hooks/useTranslation";

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  children,
  autoComplete,
}) => {
  const { lang } = useTranslation();
  const isRtl = lang === "ar";

  return (
    <div>
      <label className="block text-[11px] font-bold text-[#7a7366] tracking-wider uppercase mb-2">
        {label}
      </label>

      <div className="relative flex items-center">
        <span
          className={`material-symbols-outlined absolute ${isRtl ? "right-3" : "left-3"} text-[#b5aea3] text-[20px] z-10`}
        >
          {icon}
        </span>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full px-12 py-3 bg-surface-lowest border-2 border-[#e1ded7] rounded-lg text-sm text-[#4a453e] placeholder-[#c4bebc] focus:outline-none focus:border-[#6b6459] transition-colors duration-300 ease-in-out [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
          required
        />

        {children && (
          <div
            className={`absolute ${isRtl ? "left-3" : "right-3"} flex items-center z-10`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
