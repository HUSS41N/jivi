import React, { useState, useEffect, useRef } from "react";
import UserService from "../../services/User";
import RecordStart from "../../assets/recordStart.svg";
import RecordEnd from "../../assets/recordEnd.svg";

const VoiceRecorder = ({ setRecordedData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [progressTime, setProgressTime] = useState("00:00");
  const [silenceCountdown, setSilenceCountdown] = useState(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [response, setResponse] = useState({});
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const apiIntervalRef = useRef(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const checkSilenceIntervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const accumulatedChunksRef = useRef([]);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      apiIntervalRef.current = setInterval(() => {
        handleRecordingChunk();
      }, 2500);
    } else {
      clearInterval(apiIntervalRef.current);
    }
  }, [isRecording]);

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
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm', audioBitsPerSecond: 128000 });
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.onstop = handleRecordingStop;
    mediaRecorderRef.current.start(2500); // Capture audio in 2500ms chunks

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
    clearInterval(apiIntervalRef.current);
    silenceTimerRef.current = null;
    checkSilenceIntervalRef.current = null;
    progressIntervalRef.current = null;
    apiIntervalRef.current = null;
    setSilenceCountdown(null);
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
  };

  const handleRecordingStop = () => {
    const blob = new Blob(accumulatedChunksRef.current, { type: 'audio/webm' });
    chunksRef.current = [];
    accumulatedChunksRef.current = []; // Reset accumulated chunks after recording stop
    setRecordedData(blob);

    const recordedUrl = URL.createObjectURL(blob);
    setRecordedAudioUrl(recordedUrl);

    convertToBase64(blob, (base64Audio) => {
      const base64WithPrefix = `data:audio/webm;codecs=opus;base64,${base64Audio}`;
      transcribeApiHandler(base64WithPrefix);
    });
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      chunksRef.current.push(event.data);
      accumulatedChunksRef.current.push(event.data); // Accumulate chunks
      handleRecordingChunk(event.data);
    }
  };

  const handleRecordingChunk = (data) => {
    if (data instanceof Blob) {
      convertToBase64(new Blob(accumulatedChunksRef.current, { type: 'audio/webm' }), (base64Audio) => {
        const base64WithPrefix = `data:audio/webm;codecs=opus;base64,${base64Audio}`;
        transcribeApiHandler(base64WithPrefix);
      });
    }
  };

  const convertToBase64 = (blob, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      callback(base64String);
    };
    reader.readAsDataURL(blob);
  };

  const transcribeApiHandler = async (base64Audio) => {
    const data = { audio: base64Audio };
    setIsTranscribing(true);
    try {
      const res = await UserService.transcribeUserData(data);
      if (res?.data?.data) {
        setResponse(res);
        setTranscription(prev => prev + " " + (res.data.data.text || ""));
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-xl font-bold details-header">
        {transcription}
      </h1>
      <div className="flex flex-col justify-between items-center mt-20">
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
