export default function RoleDetailsHeader({ role, lang, t }) {
  const displayLabel = role?.label
    ? typeof role.label === "object"
      ? lang === "ar"
        ? role.label.ar || role.label.en
        : role.label.en || role.label.ar
      : role.label
    : "";

  const formattedDate = role.createdAt
    ? new Date(role.createdAt).toLocaleDateString(
        lang === "ar" ? "ar-EG" : "en-US",
        { year: "numeric", month: "long", day: "numeric" },
      )
    : "-";

  return (
    <div className="bg-surface-lowest rounded-3xl p-7 shadow-xl shadow-surface-container/60 border border-border/80 relative overflow-hidden">
      {/* تأثيرات بلور أعمق وأوضح موزعة بحرفية على الأطراف */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner shrink-0 border border-primary/20">
            <span className="material-symbols-outlined text-2xl leading-none">
              shield_person
            </span>
          </div>
          <div>
            
            <h1 className="text-2xl font-extrabold text-on-surface mt-4 tracking-wide">
              {displayLabel}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container/50 border border-border/60 rounded-2xl text-xs text-on-surface-variant shadow-xs">
          <span className="material-symbols-outlined text-primary text-base">
            calendar_month
          </span>
          <span>{t("createdAt")}:</span>
          <span className="font-semibold text-on-surface">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
