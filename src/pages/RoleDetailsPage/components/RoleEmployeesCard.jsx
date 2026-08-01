export default function RoleEmployeesCard({ employees, t }) {
  return (
    <div className="bg-surface-lowest rounded-3xl p-7 shadow-xl shadow-surface-container/60 border border-border/80 space-y-5">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <h2 className="text-lg font-bold text-on-surface flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-lg leading-none">
              group
            </span>
          </div>
          {t("assignedEmployees")}
        </h2>
        <span className="text-xs text-primary px-3 py-1 bg-primary-container/40  rounded-full border border-primary/20">
          {employees?.length || 0}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {employees && employees.length > 0 ? (
          employees.map((emp) => (
            <div
              key={emp.userId}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-surface-container/30 border border-border/50 hover:bg-surface-container/70 hover:border-primary/40 hover:scale-[1.01] transition-all duration-300 shadow-xs group"
            >
              <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {emp.firstName?.[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {emp.firstName} {emp.lastName}
                </p>
                <p className="text-xs text-on-surface-variant/60 font-mono mt-0.5">
                  ID: {emp.userId}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-8 bg-surface-container/20 rounded-2xl border border-dashed border-border/60 text-on-surface-variant/60 text-sm">
            {t("noEmployeesAssigned")}
          </div>
        )}
      </div>
    </div>
  );
}
