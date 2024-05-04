import React, { useState, useRef } from "react";
import "./AgeSelector.scss";

const AgeSelector = ({ minAge = 18, maxAge = 100, age, setAge }) => {
  const [visibleCenter, setVisibleCenter] = useState(age);
  const intervalRef = useRef(null);

  const visibleAges = Array.from(
    { length: 5 },
    (_, i) => visibleCenter - 2 + i
  ).filter(age => age >= minAge && age <= maxAge);

  const handleNext = () => {
    setVisibleCenter(prev => Math.min(prev + 1, maxAge));
  };

  const handlePrev = () => {
    setVisibleCenter(prev => Math.max(prev - 1, minAge));
  };

  const startChangingAge = (selectedAge) => {
    stopChangingAge();
    const changeFunction = selectedAge > visibleCenter ? handleNext : handlePrev;
    intervalRef.current = setInterval(changeFunction, 200)
  };

  const stopChangingAge = (selectedAge) => {
    if (intervalRef.current) {
      setAge(selectedAge)
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const calculateFontSize = (ageValue) => {
    const distance = Math.abs(ageValue - visibleCenter);
    return distance === 0 ? "5rem" : distance === 1 ? "2.5rem" : "1.25rem";
  };

  const calculateColor = (ageValue) => {
    const distance = Math.abs(ageValue - visibleCenter);
    return distance === 0 ? "#ffffff" : distance === 1 ? "#5D6A85" : "#BEC5D2";
  };

  return (
    <div className="flex flex-col space-y-4 my-3">
      <h1 className="text-xl font-bold details-header">What is your age?</h1>
      <div className="age-selector">
        <div className="ages">
          {visibleAges.map((ageValue, index) => (
            <div
              key={index}
              className={`age ${ageValue === visibleCenter ? "selected" : ""}`}
              style={{
                fontSize: calculateFontSize(ageValue),
                color: calculateColor(ageValue),
              }}
              onMouseDown={() => startChangingAge(ageValue)}
              onMouseUp={()=>stopChangingAge(ageValue)}
              onMouseLeave={()=>stopChangingAge(ageValue)}
              onTouchStart={() => startChangingAge(ageValue)}
              onTouchEnd={()=>stopChangingAge(ageValue)}
            >
              {ageValue}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;
