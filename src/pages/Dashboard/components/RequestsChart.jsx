export default function RequestsChart({ t }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-[#d0c6b0] shadow-sm flex flex-col items-center">
      <h4 className="font-bold text-lg mb-6 w-full text-center">
        {t("incomingRequests")}
      </h4>

      <div className="relative flex items-center justify-center mb-8">
        <div
          className="w-40 h-40 rounded-full border-[20px] border-[#e0ea88] flex items-center justify-center"
          style={{
            borderRight: "20px solid #735c00",
            borderBottom: "20px solid #3b674c",
          }}
        >
          <div className="text-center">
            <span className="text-3xl font-bold block text-[#1f1b14]">342</span>
            <span className="text-xs text-on-surface-variant">
              {t("total")}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        {[
          { label: "edu", color: "bg-[#e0ea88]", val: "45%" },
          { label: "fin", color: "bg-[#735c00]", val: "30%" },
          { label: "med", color: "bg-[#3b674c]", val: "25%" },
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
