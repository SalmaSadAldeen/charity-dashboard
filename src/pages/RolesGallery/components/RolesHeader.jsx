export default function RolesHeader({ onAddClick, t }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-[32px] font-bold text-on-surface-variant mb-1">
          {t("rolesManagementTitle")}
        </h2>
        <p className="text-on-surface-variant/80 text-sm">
          {t("rolesManagementSubtitle")}
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="bg-primary text-white px-5 py-2.5 rounded-2xl font-semibold shadow-sm hover:opacity-90 transition flex items-center gap-2"
      >
        <span className="material-symbols-outlined">add</span>
        {t("addNewRole")}
      </button>
    </div>
  );
}
