import React, { useState } from "react";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import InputText from "../../components/InputText/InputText";
import UserIcon from "../../assets/user.svg";
import CalendarIcon from "../../assets/calendar.svg";
import DateOfBirthInput from "../../components/DateOfBirthInput/DateOfBirthInput";
const Details = () => {
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState(0);
  const [anotherBloodPressure, setAnotherBloodPressure] = useState(0);
  const [userName, setUserName] = useState("");
  const [dob, setDob] = useState("");

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
      <InputText
        label="Username"
        icon={UserIcon}
        val={userName}
        setVal={setUserName}
        placeholder="Please enter your name"
      />
      <DateOfBirthInput
        label="Date of Birth"
        icon={CalendarIcon}
        val={dob}
        setVal={setDob}
        placeholder="Select your date of birth"
      />
    </div>
  );
};

export default Details;
