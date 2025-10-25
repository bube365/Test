import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export const MultiSelectDropdown = ({
  label,
  options,
  selected,
  onChange,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        {label}
      </label>

      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 bg-gray-100 rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-black flex items-center justify-between"
      >
        <span className="truncate text-gray-700 text-xs">
          {selected.length > 0
            ? selected.join(", ")
            : placeholder || "Select options"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 ml-2 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-white shadow-lg rounded-xl border border-gray-200 z-50 max-h-fit overflow-y-auto py-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="w-4 h-4 rounded border-gray-300 accent-black"
              />
              <span className="text-[13px] text-[#131316] font-semibold">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
