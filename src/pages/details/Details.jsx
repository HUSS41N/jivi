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
import AgeSelector from "../../components/AgeSelector/AgeSelector";
import "./details.scss";
const Details = () => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleClickNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleClickBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const StepOne = () => (
    <>
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
        label="Other Blood Pressure"
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
    </>
  );

  const StepTwo = () => (
    <>
      <WeightSelector />
    </>
  );

  const StepThree = () => (
    <>
      <AgeSelector />
    </>
  );

  return (
    <div className="details-container max-w-xs w-full flex flex-col justify-between p-2">
      <div>
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}
        {currentStep === 3 && <StepThree />}
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        {currentStep < 3 ? (
          <Button
            clickHandler={handleClickNext}
            style={{ width: "100%", height: "50px" }}
          >
            Next
          </Button>
        ) : (
          <Button
            clickHandler={() => console.log("Submit Final Data")}
            style={{ width: "100%", height: "50px" }}
          >
            Submit
          </Button>
        )}
        {currentStep > 1 && (
          <Button
            clickHandler={handleClickBack}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#DCE1E8",
            }}
          >
            Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default Details;
