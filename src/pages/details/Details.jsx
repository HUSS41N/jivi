import React, { useState } from "react";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
const Details = () => {
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState(0);
  const [anotherBloodPressure, setAnotherBloodPressure] = useState(0);
  return (
    <div>
      <RangeSlider
        label="Heart Rate"
        min={60}
        max={120}
        value={heartRate}
        setValue={setHeartRate}
      />
      <RangeSlider
        label="Blood Pressure"
        min={120}
        max={150}
        value={bloodPressure}
        setValue={setBloodPressure}
      />
      <RangeSlider
        label=""
        min={60}
        max={80}
        value={anotherBloodPressure}
        setValue={setAnotherBloodPressure}
      />
    </div>
  );
};

export default Details;
