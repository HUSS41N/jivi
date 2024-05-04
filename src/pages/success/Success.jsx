import React from "react";
import Button from "../../components/Button/Button";

const Success = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3>Thank you</h3>
        <p>Your details are saved successfully.</p>
      </div>
      <div>
        <Button>Submit Again</Button>
      </div>
    </div>
  );
};

export default Success;
