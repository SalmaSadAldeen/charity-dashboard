import "react";

const LoginHeader = ({ error }) => {
  return (
    <div className="pt-8 pb-6 px-8 flex flex-col items-center text-center">
      {/* أيقونة الشعار الزيتونية */}
      <div className="w-12 h-12 bg-[#7c766c] rounded-xl flex items-center justify-center mb-4 text-[primary-container] shadow-md">
        <span className="material-symbols-outlined text-[24px]">
          volunteer_activism
        </span>
      </div>

      <h1 className="text-2xl font-semibold text-[#4a453e] tracking-tight">
        CharityOS - Administrative Access
      </h1>
      <p className="text-xs text-[#8c8579] mt-2">
        Please enter your authorized credentials to secure your session.
      </p>

      {/* إذا كان هناك خطأ قادم من Redux، يطبعه هنا */}
      {error && (
        <p className="text-xs text-red-500 mt-2 bg-red-50 p-2 rounded w-full border border-red-100">
          {error}
        </p>
      )}
    </div>
  );
};

export default LoginHeader;
