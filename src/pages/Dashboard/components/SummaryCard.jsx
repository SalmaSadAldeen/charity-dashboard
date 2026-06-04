// src/pages/Dashboard/components/SummaryCard.jsx
export const SummaryCard = ({ title, value, icon, trend }) => (
  <div className="bg-[#EBE7E0] p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <span className="material-symbols-outlined text-amber-500 text-3xl">
        {icon}
      </span>
      {trend && (
        <span className="text-emerald-600 text-xs font-bold bg-emerald-100 px-2 py-1 rounded-lg">
          {trend}
        </span>
      )}
    </div>
    <div className="mt-4">
      <h4 className="text-gray-500 text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  </div>
);
