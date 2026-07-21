export default function FilterBar({ filters, active, onFilterChange }) {
  return (
    <div className="flex items-center gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-border w-fit shadow-sm">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
            active === f.value
              ? "bg-primary text-white shadow-md"
              : "text-on-surface-variant hover:bg-surfaceLowest"
          }`}
        >
          {f.icon && <span>{f.icon}</span>}
          {f.label}
        </button>
      ))}
    </div>
  );
}
