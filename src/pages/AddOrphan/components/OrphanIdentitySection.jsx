import { User } from "lucide-react";

export default function OrphanIdentitySection({
  formData,
  handleInputChange,
  t,
  errors,
}) {
  const fields = [
    "firstName",
    "lastName",
    "fatherName",
    "motherName",
    "birthOfDate",
    "gender",
    "guardianName",
  ];


  const inputStyle = (fieldName) =>
    `w-full p-4 bg-white border-2 rounded-2xl shadow-inner outline-none transition-all duration-300 ${
      errors[fieldName]
        ? "border-error"
        : "border-border/40 focus:border-primary"
    }`;

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-border/30 shadow-sm">
      <h3 className="text-xl font-black text-on-surface-variant mb-8 flex items-center gap-3">
        <User className="text-primary" /> {t("primaryOrphanIdentity")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((f) => (
          <div key={f} className="space-y-1">
            <label className="text-[10px] font-black text-on-surface-variant/50 uppercase">
              {t(f)}
            </label>
            {f === "gender" ? (
              <select
                name={f}
                value={formData[f] || ""}
                onChange={handleInputChange}
                className={`${inputStyle(f)} appearance-none`}
              >
                <option value="">{t("selectGender")}</option>
                <option value="MALE">{t("male")}</option>
                <option value="FEMALE">{t("female")}</option>
              </select>
            ) : f === "birthOfDate" ? (
              <input
                type="date"
                name={f}
                value={formData[f] || ""}
                onChange={handleInputChange}
                className={inputStyle(f)}
              />
            ) : (
              <input
                name={f}
                value={formData[f] || ""}
                onChange={handleInputChange}
                className={inputStyle(f)}
                placeholder={t(f)}
              />
            )}
            {errors[f] && (
              <span className="text-[10px] text-error font-bold">
                {errors[f]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
