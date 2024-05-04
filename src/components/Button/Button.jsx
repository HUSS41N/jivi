import React from "react";

const Button = ({ children, disabled, clickHandler, style }) => {
  const defaultStyle = {
    minWidth: "100px",
    height: "40px",
    backgroundColor: disabled ? '#DCE1E8' : '#0F67FE',
    ...style,
  };

  return (
    <button
      className={`px-4 py-2 text-white font-medium rounded transition ease-in-out duration-150 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
      onClick={clickHandler}
      disabled={disabled}
      style={defaultStyle}
    >
      {children}
    </button>
  );
};

export default Button;
