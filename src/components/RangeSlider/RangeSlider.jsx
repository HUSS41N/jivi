import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./RangeSlider.scss";

const RangeSlider = ({ label, min, max, value, setValue, style }) => {
  const dispatch = useDispatch();
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log(func);
        dispatch(func(...args));
      }, wait);
    };
  }

  const [sliderValue, setSliderValue] = useState(value);
  const debouncedSetSliderValue = useCallback(debounce(setValue, 300), [
    setValue,
  ]);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const trackStyle = {
    background: style?.trackColor || "rgba(0, 0, 0, 0.1)",
    height: "8px",
  };

  const thumbPosition = ((sliderValue - min) / (max - min)) * 100;
  const highlightTrackStyle = {
    background: style?.highlightColor || "#4CAF50",
    width: `${thumbPosition}%`,
    height: "8px",
  };

  const sliderStyles = {
    "--thumb-color": style?.thumbColor || "#FA4D5E",
    position: "absolute",
    top: -5,
    zIndex: 3,
    background: "transparent",
    border: "none",
    WebkitAppearance: "none",
  };

  return (
    <div className="space-y-2 my-5">
      <label
        htmlFor="range-slider"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{label} </strong>
      </label>
      <div className="relative w-full" style={{ height: trackStyle.height }}>
        <div
          style={{ ...trackStyle, position: "absolute", width: "100%" }}
        ></div>
        <div style={{ ...highlightTrackStyle, position: "absolute" }}></div>
        <input
          type="range"
          id="range-slider"
          className="w-full appearance-none cursor-pointer dark:bg-gray-700"
          style={sliderStyles}
          min={min}
          max={max}
          value={sliderValue}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            setSliderValue(newValue);
            debouncedSetSliderValue(newValue);
          }}
        />
        <div
          className="absolute text-xs text-center"
          style={{
            left: `calc(${thumbPosition}% - 12px)`,
            top: "25px",
          }}
        >
          <strong>{sliderValue}</strong>
        </div>
      </div>
      <div className="relative mt-2">
        <div className="flex justify-between text-xs">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
