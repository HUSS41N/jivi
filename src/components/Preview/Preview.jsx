import React,{useState,useEffect} from "react";

const Preview = ({
  userName,
  heartRate,
  bloodPressure,
  anotherBloodPressure,
  dob,
  gender,
  weight,
  recordedData,
  age,
}) => {
  const [audioUrl,setAudioUrl] = useState("")
  
  useEffect(()=>{
    if(!recordedData) return
    setAudioUrl(URL.createObjectURL(recordedData))
  },[recordedData])


  return (
    <div className="p-4">
      <p className="mb-4">Please confirm your details to continue.</p>
      <div className="space-y-2">
        <div><span className="font-bold w-32 inline-block">HeartRate:</span> <span>{heartRate}</span></div>
        <div><span className="font-bold w-32 inline-block">Blood Pressure:</span></div>
        <div><span className="font-bold w-32 inline-block">Systolic:</span> <span>{bloodPressure}</span></div>
        <div><span className="font-bold w-32 inline-block">Diastolic:</span> <span>{anotherBloodPressure}</span></div>
        <div><span className="font-bold w-32 inline-block">Name:</span> <span>{userName}</span></div>
        <div><span className="font-bold w-32 inline-block">Date of birth:</span> <span>{dob}</span></div>
        <div><span className="font-bold w-32 inline-block">Gender:</span> <span>{gender}</span></div>
        <div><span className="font-bold w-32 inline-block">Weight:</span> <span>{weight}</span></div>
        <div><span className="font-bold w-32 inline-block">Age:</span> <span>{age}</span></div>
        <div>
          <span className="font-bold w-32 inline-block">Custom message:</span>
          {audioUrl && (
            <audio controls src={audioUrl} className="mt-2">
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
