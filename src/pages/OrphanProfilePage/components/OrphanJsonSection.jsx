import { useTranslation } from "@/hooks/useTranslation";
export default function OrphanJsonSection({ orphan }) {
  const { t, lang } = useTranslation();
  const jsonFields = [
    "class",
    "Diseases",
    "currentAddress",
    "previousAddress",
    "talent",
  ];

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)]">
      <h3 className="font-black text-xl mb-8 text-gray-900">
        {t("additionalInfo")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jsonFields.map((f) => (
          <div
            key={f}
            className="p-5 bg-gray-50 rounded-2xl border border-gray-100"
          >
            <p className="text-[10px] uppercase font-black tracking-widest text-primary/70 mb-1">
              {t(f)}
            </p>
            <p className="font-bold text-gray-800">
              {orphan[f]?.[lang] || orphan[f]?.["ar"]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
