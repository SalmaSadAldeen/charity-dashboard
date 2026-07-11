import { ClipboardList } from "lucide-react";
export default function ExtraDataSection({
  formData,
  handleInputChange,
  t,
  errors,
}) {
  const fields = [
    "brotherAndSisterNumber",
    "bodySize",
    "shoesSize",
    "guaranteedPhone",
  ];

  return (
    <div className="bg-surface-lowest p-8 rounded-[2rem] border border-border/30 shadow-sm">
      <h3 className="text-lg font-black text-on-surface-variant mb-6 flex items-center gap-3">
        <ClipboardList className="text-primary" /> {t("extraData")}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {fields.map((f) => (
          <div key={f}>
            <label className="text-[9px] font-black text-on-surface-variant/50 uppercase">
              {t(f)}
            </label>
            <input
              name={f}
              value={formData[f] ?? ""}
              onChange={handleInputChange}
              className={`w-full mt-2 p-4 bg-surface-lowest border-2 rounded-2xl shadow-inner outline-none transition-all duration-300 ${
                errors[f]
                  ? "border-error"
                  : "border-border/40 focus:border-primary"
              } text-center font-black text-primary`}
            />
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
