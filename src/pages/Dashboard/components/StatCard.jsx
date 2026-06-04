export default function StatCard({ icon, title, val, bg }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#d0c6b0]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <span
        className={`material-symbols-outlined text-[#1f1b14] ${bg} w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}
      >
        {icon}
      </span>
      <div>
        <p className="text-[#on-surface-variant] uppercase text-xs font-semibold mt-6">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-[#1f1b14] mt-1">{val}</h3>
      </div>
    </div>
  );
}
