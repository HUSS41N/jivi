import React from "react";

const Preview = ({
  userName,
  heartRate,
  bloodPressure,
  anotherBloodPressure,
  dob,
  gender,
  weight,
  recordedData,
  age
}) => {
  return (
    <div>
      <p>Please confirm your details to continue.</p>
      <div>
        <p>HeartRate : {heartRate}</p>
        <p>Blood Pressure :</p>
        <p>Systolic : {bloodPressure}</p>
        <p>Diastolic :{anotherBloodPressure}</p>
        <p>Name: {userName}</p>
        <p>Date of birth: {dob}</p> <p>Gender: {gender}</p>
        <p>Weight : {weight}</p>
        <p>Age : {age}</p>
        <p>Custom message : </p>
      </div>
    </div>
  );
};

export default Preview;
