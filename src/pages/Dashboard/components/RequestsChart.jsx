import { useState } from "react";

export default function RequestsChart({ t, dataFromBackend, lang }) {
  const data = Array.isArray(dataFromBackend) ? dataFromBackend : [];
  const [activeTooltip, setActiveTooltip] = useState(null);

  const totalRequests = data.reduce((acc, curr) => acc + (curr.count || 0), 0);

  const hexColors = ["#e0ea88", "#3b674c", "#fad564", "#735c00", "#c29900"];
  const tailwindColors = [
    "bg-[#e0ea88]",
    "bg-[#3b674c]",
    "bg-[#fad564]",
    "bg-primary",
    "bg-[#c29900]",
  ];

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  let accumulatedLength = 0;

  const slices = data.map((item, index) => {
    const percent = totalRequests > 0 ? item.count / totalRequests : 0;
    const strokeLength = percent * circumference;
    const dashArray = `${strokeLength} ${circumference - strokeLength}`;
    const dashOffset = -accumulatedLength;
    accumulatedLength += strokeLength;

    return {
      ...item,
      dashArray,
      dashOffset,
      color: hexColors[index % hexColors.length],
    };
  });

  return (
    <div className="bg-surface-lowest p-8 rounded-3xl border border-border shadow-sm flex flex-col items-center h-full justify-between relative">
      <h4 className="font-bold text-lg mb-3 w-full text-center">
        {t("incomingRequests")}
      </h4>

      <div className="relative flex items-center justify-center mb-6">
        {activeTooltip && (
          <div className="absolute -top-12 z-20 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap transition-all">
            <span className="font-bold">{activeTooltip.category}</span>:{" "}
            {activeTooltip.count} (
            {Math.round((activeTooltip.count / totalRequests) * 100)}%)
          </div>
        )}

        <div className="w-48 h-48 relative flex items-center justify-center">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {slices.map((slice, i) => (
              <circle
                key={slice.category_id || i}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth="22"
                strokeDasharray={slice.dashArray}
                strokeDashoffset={slice.dashOffset}
                onMouseEnter={() => setActiveTooltip(slice)}
                onMouseLeave={() => setActiveTooltip(null)}
                className="cursor-pointer transition-all duration-200 hover:opacity-80"
              />
            ))}
          </svg>

          <div className="absolute w-32 h-32 bg-surface-lowest rounded-full flex items-center justify-center z-10 shadow-sm pointer-events-none">
            <div className="text-center">
              <span className="text-2xl font-bold block text-on-surface-variant">
                {totalRequests}
              </span>
              <span className="text-[12px] text-on-surface-variant">
                {t("total")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-2">
        {data.map((item, i) => {
          const percent =
            totalRequests > 0
              ? Math.round((item.count / totalRequests) * 100)
              : 0;

          return (
            <div
              key={item.category_id || i}
              className="flex justify-between items-center text-xs p-1 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded shadow-xs ${
                    tailwindColors[i % tailwindColors.length]
                  }`}
                ></div>
                <span className="font-medium text-on-surface-variant">
                  {item.category}
                </span>
              </div>
              <span className="font-bold text-on-surface-variant">
                {percent}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
