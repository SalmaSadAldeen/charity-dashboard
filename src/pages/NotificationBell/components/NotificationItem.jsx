export default function NotificationItem({ item, isRTL, onClick, isLast }) {
  return (
    <div
      onClick={onClick}
      className={`p-3.5 cursor-pointer transition-all duration-300 ease-in-out transform active:scale-95 flex gap-3 items-start relative group ${
        !item.isRead
          ? `bg-primary-container/20 hover:bg-primary-container/40 ${isRTL ? "border-r-4 border-r-primary" : "border-l-4 border-l-primary"}`
          : "bg-surface-lowest hover:bg-surface border-transparent"
      } ${!isLast ? "border-b border-border/40" : ""}`}
    >
      <div className="mt-1.5 shrink-0">
        {!item.isRead ? (
          <span className="flex h-2.5 w-2.5 rounded-full bg-primary shadow-md"></span>
        ) : (
          <span className="flex h-2 w-2 rounded-full bg-on-surface-variant/40"></span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-0.5 sm:gap-2">
          <p
            dir="auto"
            className={`text-xs sm:text-sm break-words leading-relaxed ${
              !item.isRead
                ? "font-bold text-primary"
                : "font-semibold text-on-surface-variant"
            }`}
          >
            {item.title}
          </p>
          <span className="text-[10px] sm:text-[11px] text-tertiary whitespace-nowrap shrink-0">
            {new Date(item.createdAt).toLocaleDateString(
              isRTL ? "ar-SA" : "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
              },
            )}
          </span>
        </div>

        <p
          dir="auto"
          className={`text-[11px] sm:text-xs mt-1 break-words line-clamp-2 leading-normal ${
            !item.isRead
              ? "text-secondary font-medium"
              : "text-on-surface-variant/80"
          }`}
        >
          {item.message}
        </p>
      </div>
    </div>
  );
}
