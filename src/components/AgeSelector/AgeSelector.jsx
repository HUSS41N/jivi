import React, { useState } from 'react';

const AgeSelector = ({ initialAge = 18, minAge = 0, maxAge = 120 }) => {
  const [age, setAge] = useState(initialAge);

  const handleAgeChange = (e) => {
    const newAge = parseInt(e.target.value, 10);
    if (newAge >= minAge && newAge <= maxAge) {
      setAge(newAge);
    }
  };

  const incrementAge = () => {
    setAge(prevAge => (prevAge < maxAge ? prevAge + 1 : prevAge));
  };

  const decrementAge = () => {
    setAge(prevAge => (prevAge > minAge ? prevAge - 1 : prevAge));
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-xl font-bold">What is your age?</h1>
      <div className="flex items-center space-x-3">
        <button
          onClick={decrementAge}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
          aria-label="Decrease age"
        >
          -
        </button>
        <input
          type="number"
          value={age}
          onChange={handleAgeChange}
          className="form-input px-4 py-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min={minAge}
          max={maxAge}
          style={{ width: '80px' }} // Controlling the width of the input field
        />
        <button
          onClick={incrementAge}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
          aria-label="Increase age"
        >
          +
        </button>
      </div>
      <div className="text-center">
        Current Age: {age}
      </div>
    </div>
  );
};

export default AgeSelector;
