import React, { useState, useEffect, useRef, useCallback } from "react";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentWeight } from "../../redux/slices/UserSlice";
import { convertWeight } from "../../utils/user/user-utils";
import "./WeightSelector.scss";

const Weight = ({ initialUnit = "lbs", minWeight = 0, maxWeight = 140 }) => {
  const { currentWeight } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [unit, setUnit] = useState(initialUnit);
  const [visibleCenter, setVisibleCenter] = useState(currentWeight);
  const intervalRef = useRef(null);

  useEffect(() => {
    dispatch(setCurrentWeight(visibleCenter));
  }, [visibleCenter]);

  useEffect(() => {
    const convertedWeight = convertWeight(visibleCenter, initialUnit, unit);
    setVisibleCenter(convertedWeight);
  }, [unit]);


  const toggleUnit = useCallback(() => {
    setUnit((prevUnit) => (prevUnit === "kg" ? "lbs" : "kg"));
  }, [unit]);

  const getDisplayWeight = () => {
    return unit === "lbs" ? Math.round(visibleCenter * 2.20462) : visibleCenter;
  };

  const handlePrevNext = (change) => {
    setVisibleCenter((prev) => {
      const newCenter = Math.max(minWeight, Math.min(maxWeight, prev + change));
      dispatch(setCurrentWeight(newCenter));
      return newCenter;
    });
  };

  const startChangingWeight = (change) => {
    stopChangingWeight();
    intervalRef.current = setInterval(() => handlePrevNext(change), 200);
  };

  const stopChangingWeight = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const buttonStyle = (metric) => ({
    width: "50%",
    height: "50px",
    backgroundColor: unit === metric ? "#242E49" : "#ffffff",
    borderRadius: "10px",
    border: unit === metric ? "5px solid #EDF5FF" : "none",
    color: unit !== metric ? "#5D6A85" : undefined,
    marginTop: "20px",
  });

  const visibleWeights = Array.from(
    { length: 31 },
    (_, i) => visibleCenter - 15 + i
  );

  return (
    <div className="flex flex-col space-y-4 mt-4">
      <h1 className="text-xl font-bold">What is your weight?</h1>
      <div className="flex justify-between items-center mb-10">
        <Button clickHandler={toggleUnit} style={buttonStyle("lbs")}>
          Lbs
        </Button>
        <Button clickHandler={toggleUnit} style={buttonStyle("kg")}>
          Kg
        </Button>
      </div>
      <div className="text-center mt-10">
        <p className="flex justify-center items-center mt-10">
          <span className="current-weight font-bold text-5xl leading-tight tracking-tighter px-2">
            {getDisplayWeight()}
          </span>
          <span className="current-unit font-semibold text-xl leading-snug tracking-tight">
            {unit}
          </span>
        </p>
      </div>
      <div className="relative w-full flex items-center justify-center mt-20">
        <Button
          clickHandler={() => startChangingWeight(-1)}
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
        <div className="flex items-center space-x-1 overflow-hidden">
          {visibleWeights.map((weight) => (
            <div
              key={weight}
              className={`h-6 border-t border-gray-300 ${
                weight % 5 === 0 ? "buzz-weight" : "weights"
              } ${weight === visibleCenter ? "selected-weight" : ""}`}
              onMouseDown={() =>
                startChangingWeight(weight > visibleCenter ? 1 : -1)
              }
              onMouseUp={stopChangingWeight}
              onMouseLeave={stopChangingWeight}
              onTouchStart={() =>
                startChangingWeight(weight > visibleCenter ? 1 : -1)
              }
              onTouchEnd={stopChangingWeight}
            ></div>
          ))}
        </div>
        <Button
          clickHandler={() => startChangingWeight(1)}
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
