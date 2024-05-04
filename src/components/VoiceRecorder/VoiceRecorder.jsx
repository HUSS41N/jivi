import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import RecordStart from "../../assets/recordStart.svg";
import RecordEnd from "../../assets/recordEnd.svg";
const VoiceRecorder = ({ setRecordedData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollingWaveform, setScrollingWaveform] = useState(true);
  const [progressTime, setProgressTime] = useState("00:00");
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [audioDevices, setAudioDevices] = useState([]);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const record = useRef(null);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#0F67FE",
      progressColor: "rgb(100, 0, 100)",
      scrollParent: scrollingWaveform,
    });

    record.current = wavesurfer.current.registerPlugin(
      RecordPlugin.create({
        scrollingWaveform,
        renderRecordedAudio: false,
      })
    );

    record.current.on("record-end", (blob) => {
      setRecordedData(blob);
      const container = document.querySelector("#recordings");
      const recordedUrl = URL.createObjectURL(blob);
      const wavesurferLocal = WaveSurfer.create({
        container,
        waveColor: "rgb(200, 100, 0)",
        progressColor: "rgb(100, 50, 0)",
        url: recordedUrl,
      });

      const button = document.createElement("button");
      button.textContent = "Play";
      button.onclick = () => wavesurferLocal.playPause();
      container.appendChild(button);
      wavesurferLocal.on("pause", () => (button.textContent = "Play"));
      wavesurferLocal.on("play", () => (button.textContent = "Pause"));

      const link = document.createElement("a");
      Object.assign(link, {
        href: recordedUrl,
        download:
          "recording." + blob.type.split(";")[0].split("/")[1] || "webm",
        textContent: "Download recording",
      });
      container.appendChild(link);
    });

    record.current.on("record-progress", ({ time }) => {
      updateProgress(time);
    });

    fetchAudioDevices();

    return () => wavesurfer.current.destroy();
  }, [scrollingWaveform]);

  const fetchAudioDevices = async () => {
    const devices = await RecordPlugin.getAvailableAudioDevices();
    setAudioDevices(devices);
  };

  const updateProgress = (time) => {
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    setProgressTime(
      `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`
    );
  };

  const handleRecordClick = async () => {
    if (isRecording) {
      record.current.stopRecording();
      setIsRecording(false);
      setIsPaused(false);
    } else {
      await record.current.startRecording({ deviceId: selectedDeviceId });
      setIsRecording(true);
    }
  };

  const handlePauseClick = () => {
    if (isPaused) {
      record.current.resumeRecording();
      setIsPaused(false);
    } else {
      record.current.pauseRecording();
      setIsPaused(true);
    }
  };

  return (
    <div className="">
      <h1>Record your custom message. 🎙️</h1>
      <div
        ref={waveformRef}
        className="wavesurfer"
      ></div>
      <div className="flex flex-col justify-between  items-center">
        <img
          src={!isRecording ? RecordStart : RecordEnd}
          alt="mic-icon"
          height="120px"
          width={"120px"}
          onClick={handleRecordClick}
        />

        {/* <select
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          value={selectedDeviceId}
        >
          <option value="" hidden>
            Select mic
          </option>
          {audioDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || device.deviceId}
            </option>
          ))}
        </select> */}
        <div id="recordings" style={{ margin: "1rem 0",height:0}}></div>
      </div>
    </div>
  );
};

export default VoiceRecorder;
