import React from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
const Landing = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/details");
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Button
        clickHandler={handleClick}
        style={{ width: "100%", height: "70px" }}
      >
        Get Started
      </Button>
    </div>
  );
};

export default Landing;
