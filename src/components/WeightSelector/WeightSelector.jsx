import React, { useState } from "react";

const WeightSelector = ({
  minWeight = 0,
  currentWeight,
  setCurrentWeight,
  maxWeight = 140,
}) => {
  const [unit, setUnit] = useState("kg"); // default unit is kg

  const handleWeightChange = (e) => {
    const newWeight = parseFloat(e.target.value);
    if (newWeight >= minWeight && newWeight <= maxWeight) {
      setCurrentWeight(newWeight);
    }
  };

  const toggleUnit = () => {
    if (unit === "kg") {
      setUnit("lbs");
      setCurrentWeight((prevWeight) => Math.round(prevWeight * 2.20462));
    } else {
      setUnit("kg");
      setCurrentWeight((prevWeight) => Math.round(prevWeight / 2.20462));
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-xl font-bold details-header">What is your weight?</h1>
      <input
        type="number"
        value={currentWeight}
        onChange={handleWeightChange}
        className="form-input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        min={minWeight}
        max={maxWeight}
        style={{ width: "200px" }}
      />
      <button
        onClick={toggleUnit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Switch to {unit === "kg" ? "lbs" : "kg"}
      </button>
      <div className="text-center">
        Current Weight: {currentWeight} {unit}
      </div>
    </div>
  );
};

export default WeightSelector;
