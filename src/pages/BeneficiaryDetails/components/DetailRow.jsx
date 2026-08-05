export const DetailRow = ({ label, value, isLoading = false }) => {
  return (
    <div
      className="flex justify-between items-center py-4 border-b border-gray-200
                 px-4 transition-all duration-300 hover:bg-border/10 rounded-2xl cursor-default"
    >
      <span className="text-[14px] font-bold text-gray-500 uppercase tracking-widest">
        {label || "---"}
      </span>

      {isLoading ? (
        <div className="h-5 w-20 bg-gray-100 animate-pulse rounded-md" />
      ) : (
        <span className="text-[18px] font text-gray-750 truncate max-w-[60%]">
          {value !== undefined && value !== null && value !== "" ? (
            value
          ) : (
            <span className="text-gray-300 font-normal">-</span>
          )}
        </span>
      )}
    </div>
  );
};