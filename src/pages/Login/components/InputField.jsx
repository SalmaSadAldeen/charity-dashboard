import "react";

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
  return (
    <div>
      {/* تعديل لون العنوان ليصبح دافئاً وأكثر وضوحاً بشكل أنيق */}
      <label className="block text-[11px] font-bold text-[#7a7366] tracking-wider uppercase mb-2">
        {label}
      </label>

      <div className="relative flex items-center">
        {/* الأيقونة الجانبية بلون رمادي دافئ متناسق */}
        <span className="material-symbols-outlined absolute left-3 text-[#b5aea3] text-[20px]">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full pl-10 pr-10 py-3 bg-white border-2 border-[#e1ded7] rounded-lg text-sm text-[#4a453e] placeholder-[#c4bebc] focus:outline-none focus:border-[#6b6459] transition-colors duration-300 ease-in-out [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
          required
        />

        {/* زر العين المخصص لباقي الحقول */}
        {children}
      </div>
    </div>
  );
};

export default InputField;
