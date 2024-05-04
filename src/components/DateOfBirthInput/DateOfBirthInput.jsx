import React from 'react';

const DateOfBirthInput = ({ label, val,icon, setVal, placeholder }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label htmlFor="dob" className="text-sm font-semibold text-gray-700">{label}</label>}
      <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-2">
        <img src={icon} alt="Calendar" className="w-5 h-5" />  
        <input
          type="date"
          id="dob"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default DateOfBirthInput;
