import React, { useEffect, useState } from "react";
import { string, number, bool, func } from "prop-types";
import { MicrophoneRecorder } from "../libs/MicrophoneRecorder";

const ReactMic = ({
  onSave,
  onStop,
  onStart,
  onData,
  audioBitsPerSecond,
  echoCancellation,
  autoGainControl,
  noiseSuppression,
  mimeType,
  record,
}) => {
  const [microphoneRecorder, setMicrophoneRecorder] = useState(null);

  useEffect(() => {
    const options = {
      audioBitsPerSecond,
      mimeType,
    };
    const soundOptions = {
      echoCancellation,
      autoGainControl,
      noiseSuppression,
    };

    setMicrophoneRecorder(
      new MicrophoneRecorder(
        onStart,
        onStop,
        onSave,
        onData,
        options,
        soundOptions
      )
    );

    return () => {
      if (microphoneRecorder) {
        microphoneRecorder.stopRecording();
      }
    };
  }, []);

  useEffect(() => {
    if (record) {
      if (microphoneRecorder) {
        microphoneRecorder.startRecording();
      }
    } else if (microphoneRecorder) {
      microphoneRecorder.stopRecording(onStop);
    }
  }, [record]);

  return null;
};

ReactMic.propTypes = {
  audioBitsPerSecond: number,
  mimeType: string,
  record: bool.isRequired,
  onStop: func,
  onData: func,
  onSave: func,
};

ReactMic.defaultProps = {
  audioBitsPerSecond: 128000,
  mimeType: "audio/webm",
  record: false,
  echoCancellation: false,
  autoGainControl: false,
  noiseSuppression: false,
  channelCount: 2,
};

export default ReactMic;
