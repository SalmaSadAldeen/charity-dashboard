import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { FileUp } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function EmploymentSection({
  formData,
  setFormData,
  t,
  errors,
  handleInputChange,
  clearError,
  lang,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, personalPhoto: file }));
      clearError("personalPhoto");
    }
  };

  return (
    <div className="bg-surface-lowest p-8 rounded-3xl border border-border shadow-md transition-all hover:shadow-lg">
      <h3 className="font-bold text-lg mb-6 text-on-surface-variant flex items-center gap-2">
        <Briefcase size={20} className="text-primary" />{" "}
        {t("employmentDetails")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        {/* تاريخ الميلاد */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("dateOfBirth")}
          </label>
          <DatePicker
            selected={
              formData.dateOfBirth ? new Date(formData.dateOfBirth) : null
            }
            onChange={(date) => {
              const formattedDate = date
                ? date.toISOString().split("T")[0]
                : "";
              handleInputChange({
                target: {
                  name: "dateOfBirth",
                  value: formattedDate,
                },
              });
            }}
            maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            dateFormat="dd/MM/yyyy"
            placeholderText={lang === "ar" ? "أدخل التاريخ" : "Enter date"}
            className="w-full p-4 border border-border rounded-2xl shadow-inner focus:border-secondary outline-none transition-all"
            wrapperClassName="w-full"
          />
          {errors.dateOfBirth && (
            <p className="text-error text-xs mt-1">{errors.dateOfBirth}</p>
          )}
        </div>
        {/* حقل رفع الصورة - بعد التعديل */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="w-full h-[60px] border-2 border-dashed border-border rounded-2xl flex items-center px-4 cursor-pointer bg-surface-lowest transition-all hover:border-primary/50 overflow-hidden"
        >
          {formData.personalPhoto ? (
            <div className="flex items-center gap-3 w-full">
              {/* الحاوية الدائرية */}
              <div className="w-10 h-10 rounded-full overflow-hidden border border-border shrink-0 flex items-center justify-center bg-surface">
                {typeof formData.personalPhoto === "string" ? (
                  <img
                    src={formData.personalPhoto}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling?.classList.remove("hidden");
                    }}
                  />
                ) : null}

                {/* الأيقونة التي ستظهر إذا حدث خطأ في تحميل الصورة */}
                <FileUp
                  className={`text-primary ${typeof formData.personalPhoto === "string" ? "hidden" : ""}`}
                  size={18}
                />
              </div>

              <span className="text-sm font-medium text-on-surface-variant truncate flex-1">
                {typeof formData.personalPhoto === "string"
                  ? t("currentPhoto")
                  : formData.personalPhoto.name}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-full bg-surface-lowest flex items-center justify-center border border-border shrink-0">
                <FileUp className="text-primary opacity-60" size={18} />
              </div>
              <span className="text-sm font-medium text-on-surface-variant">
                {t("uploadProfilePicture")}
              </span>
            </div>
          )}
        </div>
        {errors.personalPhoto && (
          <p className="text-error text-xs mt-1">{errors.personalPhoto}</p>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
    </div>
  );
}
