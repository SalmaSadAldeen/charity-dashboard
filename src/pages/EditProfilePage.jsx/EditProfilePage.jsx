import { useProfile } from "@/hooks/useProfile";
import { User, Lock, Camera, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    gender,
    setGender,
    dateOfBirth,
    setDateOfBirth,
    previewImage,
    handleImageChange,
    handleUpdateProfile,
    loadingProfile,
    isLoading,
    isArabic,
    t,
  } = useProfile();

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={36} />
      </div>
    );
  }

  // معالجة الحفظ أصبحت بالكامل داخل الـ Hook
  const handleSubmit = (e) => {
    handleUpdateProfile(e);
  };

  return (
    <div
      className="max-w-2xl mx-auto p-6 space-y-6"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* رأس الصفحة مع زر الرجوع وزر تغيير كلمة المرور */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-black text-on-surface-variant">
            {t("myProfile") || "الملف الشخصي"}
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            {t("profileSubtitle") || "تعديل المعلومات الشخصية والصورة"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* زر تغيير كلمة المرور */}
          <button
            onClick={() => navigate("/dashboard/profile/change-password")}
            className="flex items-center gap-2 py-2 px-3.5 bg-gray-100 hover:bg-gray-200 text-on-surface-variant rounded-2xl text-xs font-bold transition-colors cursor-pointer"
          >
            <Lock size={15} />
            <span>{t("changePassword") || "تغيير كلمة المرور"}</span>
          </button>

          {/* زر الرجوع */}
     <button
            onClick={() => navigate("/dashboard/profile")}
            className="flex items-center gap-1.5 py-2 px-3.5 bg-gray-100 hover:bg-gray-200 text-on-surface-variant rounded-2xl text-xs font-bold transition-colors cursor-pointer"
          >
            {isArabic ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            <span>{t("back") || "رجوع"}</span>
          </button>
        </div>
      </div>

      {/* نموذج تعديل البروفايل */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-lowest border border-border rounded-3xl p-6 space-y-6 shadow-sm"
      >
        {/* الصورة الشخصية */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-border bg-gray-100 flex items-center justify-center shadow-xs">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={32} className="text-gray-400" />
            )}
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white">
              <Camera size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface-variant">
              {t("personalPhoto") || "الصورة الشخصية"}
            </p>
            <p className="text-xs text-gray-400">
              {t("clickToChangePhoto") || "انقر على الصورة لتغييرها"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant/80">
              {t("firstName") || "الاسم الأول"}
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full py-3 px-4 bg-gray-50/50 border border-border rounded-2xl text-sm font-bold text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant/80">
              {t("lastName") || "الاسم الأخير"}
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full py-3 px-4 bg-gray-50/50 border border-border rounded-2xl text-sm font-bold text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant/80">
              {t("email") || "البريد الإلكتروني"}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-4 bg-gray-50/50 border border-border rounded-2xl text-sm font-bold text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant/80">
              {t("gender") || "الجنس"}
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full py-3 px-4 bg-gray-50/50 border border-border rounded-2xl text-sm font-bold text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
            >
              <option value="MALE">{t("male") || "ذكر / Male"}</option>
              <option value="FEMALE">{t("female") || "أنثى / Female"}</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant/80">
            {t("dateOfBirth") || "تاريخ الميلاد"}
          </label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full py-3 px-4 bg-gray-50/50 border border-border rounded-2xl text-sm font-bold text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loadingProfile}
          className="w-full py-3.5 bg-primary text-white rounded-2xl font-bold text-sm hover:opacity-95 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loadingProfile ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            t("saveChanges") || "حفظ التغييرات"
          )}
        </button>
      </form>
    </div>
  );
}