import React from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import "./success.scss";

const Success = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/details");
  };

  return (
    <div className="success-page">
      <div className="success-content">
        <h3>Thank you</h3>
        <p>Your details are saved successfully.</p>
      </div>
      <div className="success-button">
        <Button clickHandler={handleClick} style={{ width: "100%", height: "70px" }}>Submit Again</Button>
      </div>
    </div>
  );
};

export default Success;
