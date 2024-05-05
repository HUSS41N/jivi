import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setDob } from "../../redux/slices/UserSlice";
const DateOfBirthInput = ({ label, val, icon, setVal, placeholder }) => {
  const dispatch = useDispatch();
  const { dob } = useSelector(state => state.user);
  const hasValue = val !== ''; 

  return (
    <div className="flex flex-col space-y-1 my-5">
      {label && <label htmlFor="dob" className="text-sm font-semibold text-gray-700">{label}</label>}
      <div className="flex items-center space-x-2  rounded-lg p-2 bg-custom-bg">
        <img src={icon} alt="Calendar" className="w-5 h-5" />
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => {
            console.log(e.target.value)
            dispatch(setDob(e.target.value));
          }}
          className={`flex-1 outline-none bg-transparent h-10 ${hasValue ? '' : 'placeholder-custom-placeholder'}`}
        />
        {/* {!hasValue && <span className="absolute text-custom-placeholder ml-8 pointer-events-none">{placeholder}</span>} */}
      </div>
    </div>
  );
};

export default DateOfBirthInput;
