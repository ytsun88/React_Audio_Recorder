import React, { useState, useRef, useEffect } from "react";
import ReactMic from "./components/ReactMic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faRecordVinyl } from "@fortawesome/free-solid-svg-icons";

function AudioRecorder({ setURLList }) {
  const [recording, setRecording] = useState(false);
  const [checkAudioBlob, setCheckAudioBlob] = useState("");
  const chunksRef = useRef([]);
  const timerRef = useRef();
  const recordingInProgressRef = useRef(false); // Flag to track recording status

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space" && !recordingInProgressRef.current) {
        startRecording();
        recordingInProgressRef.current = true;
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === "Space") {
        stopRecording();
        recordingInProgressRef.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const startRecording = () => {
    setRecording(true);
    setCheckAudioBlob("");
    timerRef.current = setInterval(() => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const blobURL = URL.createObjectURL(blob);
      setURLList((prev) => [...prev, blobURL]);
    }, 1000);
  };

  const stopRecording = () => {
    setRecording(false);
    clearInterval(timerRef.current);
  };

  const onData = (recordedBlob) => {
    chunksRef.current.push(recordedBlob);
  };

  const onStop = (recordedBlob) => {
    chunksRef.current = [];
    console.log(recordedBlob);
    setURLList((prev) => [...prev, recordedBlob.blobURL]);
    setCheckAudioBlob(recordedBlob.blobURL);
  };

  return (
    <div>
      <ReactMic
        record={recording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FFFFFF"
      />
      {!recording ? (
        <FontAwesomeIcon icon={faMicrophone} style={{ fontSize: "1.5rem" }} />
      ) : (
        <FontAwesomeIcon
          icon={faRecordVinyl}
          style={{ fontSize: "1.5rem" }}
          className="fa-beat-fade"
        />
      )}
      {checkAudioBlob !== "" && <audio src={checkAudioBlob} controls />}
    </div>
  );
}

export default AudioRecorder;
