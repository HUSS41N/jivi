import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
const WeightSelector = ({
  initialWeight = 68, 
  initialUnit = "lbs",
  minWeight = 0, 
  maxWeight = 140, 
}) => {
  const [unit, setUnit] = useState(initialUnit);
  const [weightInKg, setWeightInKg] = useState(() =>
    initialUnit === "kg" ? initialWeight : Math.round(initialWeight / 2.20462)
  );
  const [displayWeight, setDisplayWeight] = useState(() =>
    initialUnit === "kg" ? initialWeight : Math.round(initialWeight * 2.20462)
  );

  useEffect(() => {
   
    if (unit === "lbs") {
      setDisplayWeight(Math.round(weightInKg * 2.20462)); 
    } else {
      setDisplayWeight(weightInKg); 
    }
  }, [unit, weightInKg]);

  const handleWeightChange = (e) => {
    const newWeight = parseFloat(e.target.value);
    if (newWeight >= minWeight && newWeight <= maxWeight) {
      if (unit === "lbs") {
        setWeightInKg(Math.round(newWeight / 2.20462)); 
        setDisplayWeight(newWeight); 
      } else {
        setWeightInKg(newWeight);
        setDisplayWeight(newWeight); 
      }
    }
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
      };
    }
    return {
      width: "50%",
      height: "50px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      color: "#5D6A85",
      border:"none"
    };
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-xl font-bold">What is your weight?</h1>
      <div className="flex justify-between items-center">
        <Button
          clickHandler={toggleUnit}
          style={buttonStyleHandler("lbs")}
        >
          Lbs
        </Button>
        <Button
          clickHandler={toggleUnit}
          style={buttonStyleHandler("kg")}
        >
          Kg
        </Button>
      </div>
      <input
        type="number"
        value={displayWeight}
        onChange={handleWeightChange}
        className="form-input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        min={minWeight}
        max={maxWeight}
        style={{ width: "200px" }}
      />

      <div className="text-center">
        Current Weight: {displayWeight} {unit}
      </div>
    </div>
  );
};

export default WeightSelector;
