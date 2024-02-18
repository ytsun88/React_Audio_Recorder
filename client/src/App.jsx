import React, { useState } from "react";
import AudioRecorder from "./AudioRecorder";

function App() {
  const [URLList, setURLList] = useState([]);
  return (
    <div className="App">
      <AudioRecorder setURLList={setURLList} />
      <div>
        {URLList.length > 0 &&
          URLList.map((url, index) => <audio src={url} controls key={index} />)}
      </div>
    </div>
  );
}

export default App;
