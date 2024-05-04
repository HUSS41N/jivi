import React, { useState, useEffect, useRef } from "react";
import Button from "../Button/Button";
import "./WeightSelector.scss";
const Weight = ({
  initialWeight = 68,
  initialUnit = "lbs",
  minWeight = 0,
  maxWeight = 140,
  setCurrentWeight,
}) => {
  const [unit, setUnit] = useState(initialUnit);
  const [visibleCenter, setVisibleCenter] = useState(initialWeight);
  const [weightInKg, setWeightInKg] = useState(() =>
    initialUnit === "kg" ? initialWeight : Math.round(initialWeight / 2.20462)
  );
  const [displayWeight, setDisplayWeight] = useState(() =>
    initialUnit === "kg" ? initialWeight : Math.round(initialWeight * 2.20462)
  );
  const intervalRef = useRef(null);

  useEffect(() => {
    if (unit === "lbs") {
      setDisplayWeight(Math.round(weightInKg * 2.20462));
    } else {
      setDisplayWeight(weightInKg);
    }
  }, [unit, weightInKg]);

  const handleWeightChange = () => {
    const visibleWeights = [
      Math.max(visibleCenter - 1, minWeight),
      visibleCenter,
      Math.min(visibleCenter + 1, maxWeight),
    ];
    const midValue = visibleWeights[1];
    setCurrentWeight(midValue);
    setDisplayWeight(midValue);
    setWeightInKg(midValue);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "kg" ? "lbs" : "kg"));
  };

  const buttonStyleHandler = (metric) => {
    if (unit === metric) {
      return {
        width: "50%",
        height: "50px",
        backgroundColor: "#242E49",
        borderRadius: "10px",
        border: "5px solid #EDF5FF",
        marginTop:"20px"
      };
    }
    return {
      width: "50%",
      height: "50px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      color: "#5D6A85",
      border: "none",
    };
  };

  const weights = Array.from({ length: 151 }, (_, index) => index);
  const visibleWeights = Array.from(
    { length: 31 },
    (_, i) => visibleCenter - 15 + i
  );

  const handleNext = () => {
    setVisibleCenter((prev) => Math.min(prev + 1, maxWeight));
  };

  const handlePrev = () => {
    setVisibleCenter((prev) => Math.max(prev - 1, minWeight));
  };

  const startChangingWeight = (selectedWeight) => {
    stopChangingWeight();
    const changeFunction =
      selectedWeight > visibleCenter ? handleNext : handlePrev;
    intervalRef.current = setInterval(changeFunction, 200);
  };
  const stopChangingWeight = (selectedWeight) => {
    if (intervalRef.current) {
      handleWeightChange();
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  console.log("visibleCenter", visibleWeights, visibleCenter);
  return (
    <div>
      <div className="flex flex-col space-y-4 mt-4">
        <h1 className="text-xl font-bold">What is your weight?</h1>
        <div className="flex justify-between items-center mb-10">
          <Button clickHandler={toggleUnit} style={buttonStyleHandler("lbs")}>
            Lbs
          </Button>
          <Button clickHandler={toggleUnit} style={buttonStyleHandler("kg")}>
            Kg
          </Button>
        </div>
        <div className="text-center mt-10">
          <p className="flex justify-center items-center mt-10">
            <span className=" current-weight font-bold text-5xl leading-tight tracking-tighter px-2">
              {displayWeight}
            </span>
            <span className="current-unit font-semibold text-xl leading-snug tracking-tight">
              {unit}
            </span>
          </p>
        </div>
      </div>
      <div className="relative w-full flex items-center mt-20">
        <Button
          clickHandler={handlePrev}
          style={{
            width: "50px",
            backgroundColor: "#ffffff",
            border: "none",
            color: "#DCE1E8",
            padding: "5px",
          }}
        >
          {"<"}
        </Button>
        <div className="flex items-center space-x-1">
          {visibleWeights.map((weight) => (
            <div
              key={weight}
              className={`h-6 border-t border-gray-300 ${
                weight % 5 === 0 ? "buzz-weight" : "weights"
              } ${weight === visibleCenter ? "selected-weight" : ""}`}
              onMouseDown={() => startChangingWeight(weight)}
              onMouseUp={() => stopChangingWeight(weight)}
              onMouseLeave={() => stopChangingWeight(weight)}
              onTouchStart={() => startChangingWeight(weight)}
              onTouchEnd={() => stopChangingWeight(weight)}
            ></div>
          ))}
        </div>
        <Button
          clickHandler={handleNext}
          style={{
            width: "50px",
            backgroundColor: "#ffffff",
            border: "none",
            color: "#DCE1E8",
            padding: "5px",
          }}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default Weight;
