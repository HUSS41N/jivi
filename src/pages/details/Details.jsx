import React, { useState } from "react";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import InputText from "../../components/InputText/InputText";
import UserIcon from "../../assets/user.svg";
import CalendarIcon from "../../assets/calendar.svg";
import GenderIcon from "../../assets/gender.svg";
import DateOfBirthInput from "../../components/DateOfBirthInput/DateOfBirthInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import Button from "../../components/Button/Button";
import AgeSelector from "../../components/AgeSelector/AgeSelector";
import "./details.scss";
import VoiceRecorder from "../../components/VoiceRecorder/VoiceRecorder";
import Preview from "../../components/Preview/Preview";
import Weight from "../../components/WeightSelector/Weight";
import UserService from "../../services/User";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setUserName, setHeartRate, setBloodPressure, setAnotherBloodPressure } from "../../redux/slices/UserSlice";
import { genderOptions } from "../../utils/user/user-utils";
const Details = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  const { userName, dob, age, currentWeight, heartRate, bloodPressure, anotherBloodPressure } = user;
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [gender, setGender] = useState("Male");
  const [recordedData, setRecordedData] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleClickBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitHandler = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("heartRate", heartRate);
    formData.append("bloodPressure", bloodPressure);
    formData.append("anotherBloodPressure", anotherBloodPressure);
    formData.append("userName", userName);
    formData.append("dob", dob);
    formData.append("age", age);
    formData.append("currentWeight", currentWeight);
    formData.append("gender", gender);
    formData.append("recordedData", recordedData);

    try {
      const response = await UserService.postUserData(formData);
      console.log("Response: ", response);

      if (response.status === 200) {
        navigate("/success");
      } else {
        console.error("Failed to submit data:", response.statusText);
        alert("Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.error("Error during data submission:", error);
      alert(
        "An error occurred while submitting your data. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepOne = () => (
    <>
      <RangeSlider
        label="Heart Rate"
        min={60}
        max={120}
        value={heartRate}
        setValue={setHeartRate}
        style={{ highlightColor: "#0F67FE", thumbColor: "#0F67FE" }}
      />
      <RangeSlider
        label="Blood Pressure"
        min={120}
        max={150}
        value={bloodPressure}
        setValue={setBloodPressure}
        style={{ highlightColor: "#FA4D5E" }}
      />
      <RangeSlider
        label="Other Blood Pressure"
        min={60}
        max={80}
        value={anotherBloodPressure}
        setValue={setAnotherBloodPressure}
        style={{ highlightColor: "#FA4D5E" }}
      />
      <InputText
        label="Username"
        icon={UserIcon}
        val={userName}
        setVal={()=>dispatch(setUserName())}
        placeholder="Please enter your name"
      />
      <DateOfBirthInput
        label="Date of Birth"
        icon={CalendarIcon}
        placeholder="Select your date of birth"
      />
      <SelectInput
        label="Gender"
        icon={GenderIcon}
        options={genderOptions}
        placeholder="Select a Gender"
      />
    </>
  );

  const StepTwo = () => (
    <>
      <Weight
        initialWeight={currentWeight}
      />
    </>
  );

  const StepThree = () => (
    <>
      <AgeSelector age={age} />
    </>
  );

  const StepFour = () => (
    <>
      <VoiceRecorder
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        setRecordedData={setRecordedData}
      />
    </>
  );

  const StepFive = () => (
    <Preview
      userName={userName}
      age={age}
      weight={currentWeight}
      heartRate={heartRate}
      bloodPressure={bloodPressure}
      anotherBloodPressure={anotherBloodPressure}
      dob={dob}
      gender={gender}
      recordedData={recordedData}
    />
  );

  return (
    <div className="details-container w-full flex flex-col justify-between">
      <div>
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}
        {currentStep === 3 && <StepThree />}
        {currentStep === 4 && <StepFour />}
        {currentStep === 5 && <StepFive />}
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        {currentStep < 5 ? (
          <Button
            clickHandler={handleClickNext}
            style={{ width: "100%", height: "70px" }}
          >
            Next
          </Button>
        ) : (
          <Button
            clickHandler={() => submitHandler()}
            style={{ width: "100%", height: "70px" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        )}
        {currentStep > 1 && (
          <Button
            clickHandler={handleClickBack}
            style={{
              width: "100%",
              height: "70px",
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
