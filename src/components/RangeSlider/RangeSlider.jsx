import React from 'react';

const RangeSlider = ({ label, min, max, value, setValue, style }) => {
  const trackStyle = {
    background: style?.color || 'bg-gray-200',
    height: style?.height || 'h-2',
  };

  const thumbStyle = {
    boxShadow: `0px 0px 1px 1px ${style?.thumbColor || '#000'}`
  };

  return (
    <div className="space-y-2">
      <label htmlFor="range-slider" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="range"
        id="range-slider"
        className={`w-full ${trackStyle.height} rounded-lg appearance-none cursor-pointer dark:bg-gray-700`}
        style={thumbStyle}
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
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
