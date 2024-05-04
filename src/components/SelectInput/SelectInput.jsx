import React from "react";

const SelectInput = ({ label, icon, val, setVal, options, placeholder }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <div className="relative flex items-center border border-gray-300 rounded-lg">
        <img src={icon} alt="Calendar" className="w-5 h-5 ml-2" />
        <select
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="flex-1 p-2 appearance-none outline-none bg-transparent cursor-pointer"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="p-2">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
