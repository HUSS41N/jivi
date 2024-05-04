import React, { useState } from "react";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import InputText from "../../components/InputText/InputText";
import UserIcon from "../../assets/user.svg";
import CalendarIcon from "../../assets/calendar.svg";
import GenderIcon from "../../assets/gender.svg";
import DateOfBirthInput from "../../components/DateOfBirthInput/DateOfBirthInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import Button from "../../components/Button/Button";
import WeightSelector from "../../components/WeightSelector/WeightSelector";

const Details = () => {
  const [heartRate, setHeartRate] = useState(80);
  const [bloodPressure, setBloodPressure] = useState(140);
  const [anotherBloodPressure, setAnotherBloodPressure] = useState(70);
  const [userName, setUserName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleClick = () => {
    console.log("Button was clicked!");
  };

  const customButtonStyles = {
    width: "100%",
    height: "50px",
    marginTop: "10px",
  };

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
      <SelectInput
        label="Gender"
        icon={GenderIcon}
        val={gender}
        setVal={setGender}
        options={options}
        placeholder="Select a Gender"
      />
      <WeightSelector />
      <Button
        clickHandler={handleClick}
        disabled={true}
        style={customButtonStyles}
      >
        Next
      </Button>
    </div>
  );
};

export default Details;
