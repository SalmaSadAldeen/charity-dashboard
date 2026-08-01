export default function RolePermissionsCard({ permissions, t }) {
  return (
    <div className="bg-surface-lowest rounded-3xl p-7 shadow-xl shadow-surface-container/60 border border-border/80 space-y-5">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <h2 className="text-lg font-bold text-on-surface flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-lg leading-none">
              security
            </span>
          </div>
          {t("permissions")}
        </h2>
        <span className="text-xs text-primary px-3 py-1 bg-primary-container/40  rounded-full border border-primary/20">
          {permissions?.length || 0}
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {permissions && permissions.length > 0 ? (
          permissions.map((perm) => (
            <span
              key={perm.id}
              className="px-4 py-2 bg-surface-container/40 border border-border/70 text-on-surface text-xs font-medium rounded-2xl shadow-xs hover:bg-primary/10 hover:text-primary hover:border-primary/40 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              {perm.translatedName}
            </span>
          ))
        ) : (
          <div className="w-full text-center py-8 bg-surface-container/20 rounded-2xl border border-dashed border-border/60 text-on-surface-variant/60 text-sm">
            {t("noPermissions")}
          </div>
        )}
      </div>
    </div>
  );
}
