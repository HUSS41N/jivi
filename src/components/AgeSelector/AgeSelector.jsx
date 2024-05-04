import React, { useState, useRef } from "react";
import "./AgeSelector.scss";

const AgeSelector = ({ minAge = 18, maxAge = 100, age, setAge }) => {
  const [visibleCenter, setVisibleCenter] = useState(age);
  const touchStart = useRef(null);

  const visibleAges = Array.from(
    { length: 5 },
    (_, i) => visibleCenter - 2 + i
  ).filter((age) => age >= minAge && age <= maxAge);

  const handleNext = () => {
    setVisibleCenter((prev) => Math.min(prev + 1, maxAge - 2));
  };

  const handlePrev = () => {
    setVisibleCenter((prev) => Math.max(prev - 1, minAge + 2));
  };

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!touchStart.current) {
      return;
    }
    const currentTouch = e.targetTouches[0].clientY;
    const diff = touchStart.current - currentTouch;

    if (diff > 50) {
      handleNext();
      touchStart.current = null;
    } else if (diff < -50) {
      handlePrev();
      touchStart.current = null;
    }
  };

  const calculateFontSize = (ageValue) => {
    const distance = Math.abs(ageValue - visibleCenter);
    switch (distance) {
      case 0:
        return "5rem";
      case 1:
        return "2.5rem";
      default:
        return "1.25rem";
    }
  };

  const calculateColor = (ageValue) => {
    const distance = Math.abs(ageValue - visibleCenter);
    switch (distance) {
      case 0:
        return "#ffffff";
      case 1:
        return "#5D6A85";
      default:
        return "#BEC5D2";
    }
  };

  return (
    <div className="flex flex-col space-y-4 my-3">
      <h1 className="text-xl font-bold details-header">What is your age?</h1>
      <div className="age-selector">
        <div
          className="ages"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {visibleAges.map((ageValue, index) => (
            <div
              key={index}
              className={`age ${ageValue === visibleCenter ? "selected" : ""}`}
              style={{
                fontSize: calculateFontSize(ageValue),
                color: calculateColor(ageValue),
              }}
              onClick={() => setAge(ageValue)}
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
