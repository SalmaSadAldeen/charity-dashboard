export default function StatCard({ icon, title, val, bg }) {
  return (
    <div className="bg-surface-lowest p-6 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <span
        className={`material-symbols-outlined text-on-surface-variant ${bg} w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}
      >
        {icon}
      </span>
      <div>
        <p className="text-[#on-surface-variant] uppercase text-xs font-semibold mt-6">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-on-surface-variant mt-1">
          {val}
        </h3>
      </div>
    </div>
  );
}
