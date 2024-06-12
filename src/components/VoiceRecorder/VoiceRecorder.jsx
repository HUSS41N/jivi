import React, { useState, useEffect, useRef } from "react";
import RecordStart from "../../assets/recordStart.svg";
import RecordEnd from "../../assets/recordEnd.svg";

const VoiceRecorder = ({ setRecordedData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [progressTime, setProgressTime] = useState("00:00");
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [audioDevices, setAudioDevices] = useState([]);
  const [silenceCountdown, setSilenceCountdown] = useState(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const checkSilenceIntervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const startTimeRef = useRef(null);

  useEffect(() => {
    fetchAudioDevices();
  }, []);

  const fetchAudioDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
    setAudioDevices(audioInputDevices);
  };

  const updateProgress = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTimeRef.current;
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    setProgressTime(
      `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    );
  };

  const handleRecordClick = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: selectedDeviceId } });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = event => chunksRef.current.push(event.data);
    mediaRecorderRef.current.onstop = handleRecordingStop;
    mediaRecorderRef.current.start();

    setIsRecording(true);
    startTimeRef.current = Date.now();
    progressIntervalRef.current = setInterval(updateProgress, 1000);

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;
    source.connect(analyserRef.current);
    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    checkSilenceIntervalRef.current = setInterval(() => {
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
      let sum = 0.0;
      for (let i = 0; i < bufferLength; i++) {
        const amplitude = (dataArrayRef.current[i] / 128.0) - 1.0;
        sum += amplitude * amplitude;
      }
      const rms = Math.sqrt(sum / bufferLength);
      console.log("rms ", rms);
      if (rms < 0.05) { 
        if (!silenceTimerRef.current) {
          setSilenceCountdown(5);
          silenceTimerRef.current = setInterval(() => {
            setSilenceCountdown((prev) => {
              if (prev === 1) {
                clearInterval(silenceTimerRef.current);
                silenceTimerRef.current = null;
                stopRecording();
              }
              return prev - 1;
            });
          }, 1000);
        }
      } else {
        clearInterval(silenceTimerRef.current);
        silenceTimerRef.current = null;
        setSilenceCountdown(null);
      }
    }, 500);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    clearInterval(silenceTimerRef.current);
    clearInterval(checkSilenceIntervalRef.current);
    clearInterval(progressIntervalRef.current);
    silenceTimerRef.current = null;
    checkSilenceIntervalRef.current = null;
    progressIntervalRef.current = null;
    setSilenceCountdown(null);
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
  };

  const handleRecordingStop = () => {
    const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
    chunksRef.current = [];
    setRecordedData(blob);

    const recordedUrl = URL.createObjectURL(blob);
    setRecordedAudioUrl(recordedUrl);
  };

  return (
    <div className="">
      <h1 className="text-xl font-bold details-header">
        Record your custom message.
      </h1>
      <div className="flex flex-col justify-between  items-center mt-20">
        <img
          src={!isRecording ? RecordStart : RecordEnd}
          alt="mic-icon"
          height="120px"
          width={"120px"}
          onClick={handleRecordClick}
        />
        <div>
          {!isRecording ? (
            <p className="font-semibold text-lg text-recording leading-recording tracking-tightest text-start-recording mt-10">
              Press to START recording
            </p>
          ) : (
            <p className="font-semibold text-lg text-recording leading-recording tracking-tightest text-stop-recording mt-10">
              Press to STOP recording
            </p>
          )}
        </div>
        {isRecording ? (
          <p className="font-semibold text-lg text-recording leading-recording tracking-tightest text-stop-recording">
            {progressTime}
          </p>
        ) : null}
        {silenceCountdown !== null ? (
          <p className="font-semibold text-lg text-recording leading-recording tracking-tightest text-stop-recording">
            Silence detected: {silenceCountdown}
          </p>
        ) : null}

        {recordedAudioUrl && (
          <div>
            <audio controls src={recordedAudioUrl} />
            <a href={recordedAudioUrl} download="recording.webm">
              Download recording
            </a>
          </div>
        )}

        <div id="recordings" style={{ margin: "1rem 0", height: 0 }}></div>
      </div>
    </div>
  );
};

export default VoiceRecorder;
