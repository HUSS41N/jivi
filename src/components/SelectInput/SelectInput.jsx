import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGender } from "../../redux/slices/UserSlice";
const SelectInput = ({ label, icon, val, setVal, options, placeholder }) => {
  const dispatch = useDispatch();
  const { gender } = useSelector(state => state.user);
  return (
    <div className="flex flex-col space-y-1 my-5">
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <div className="relative flex items-center rounded-lg bg-custom-bg" style={{ height: "55px" }}> 
        <img src={icon} alt="Icon" className="w-5 h-5 ml-2 object-cover" /> 
        <select
          value={gender}
          onChange={(e) => dispatch(setGender(e.target.value))}
          className="flex-1 p-2 appearance-none outline-none bg-transparent cursor-pointer h-full w-full"
        >
          <option value="" disabled hidden={!!gender}>
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
