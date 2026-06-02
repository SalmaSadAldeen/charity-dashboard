import "react";

const RememberMeToggle = ({ checked, onToggle }) => {
  return (
    <div className="flex items-center space-x-3 pt-1">
      <button
        type="button"
        onClick={onToggle}
        className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
          checked ? "bg-[#7c766c]" : "bg-[#d5cfc5]"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <span className="text-xs text-[#6e685e] select-none">
        Keep me logged in
      </span>
    </div>
  );
};

export default RememberMeToggle;
