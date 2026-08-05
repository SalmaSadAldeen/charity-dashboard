export default function RequestsChart({ t, dataFromBackend }) {

  const eduPercent = dataFromBackend?.edu || 0;
  const medPercent = dataFromBackend?.med || 0;
  const foodPercent = dataFromBackend?.food || 0;
  const houPercent = dataFromBackend?.hou || 0;
  const projPercent = dataFromBackend?.proj || 0;


  const eduEnd = eduPercent;
  const medEnd = eduEnd + medPercent;
  const foodEnd = medEnd + foodPercent;
  const houEnd = foodEnd + houPercent;

  console.log("Data from backend:", dataFromBackend);
  return (
    <div className="bg-surface-lowest p-8 rounded-3xl border border-border shadow-sm flex flex-col items-center">
      <h4 className="font-bold text-lg mb-3 w-full text-center">
        {t("incomingRequests")}
      </h4>

      <div className="relative flex items-center justify-center mb-8">
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            background: `conic-gradient(
              #e0ea88 0% ${eduEnd}%, 
              #3b674c ${eduEnd}% ${medEnd}%, 
              #fad564 ${medEnd}% ${foodEnd}%, 
              #735c00 ${foodEnd}% ${houEnd}%, 
              #c29900 ${houEnd}% 100%
            )`,
          }}
        >
          <div className="w-28 h-28 bg-surface-lowest rounded-full flex items-center justify-center z-10">
            <div className="text-center">
              <span className="text-3xl font-bold block text-on-surface-variant">
                {dataFromBackend?.total || 0}
              </span>
              <span className="text-xs text-on-surface-variant">
                {t("total")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        {[
          { label: "edu", color: "bg-[#e0ea88]", val: `${eduPercent}%` },
          { label: "med", color: "bg-[#3b674c]", val: `${medPercent}%` },
          { label: "food", color: "bg-[#fad564]", val: `${foodPercent}%` },
          { label: "hou", color: "bg-primary", val: `${houPercent}%` },
          { label: "proj", color: "bg-[#c29900]", val: `${projPercent}%` },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${item.color}`}></div>
              <span>{t(item.label)}</span>
            </div>
            <span className="font-bold">{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
