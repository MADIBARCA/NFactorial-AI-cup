import React, { useState, useEffect } from "react";
import UploadIcon from "../../../../assets/main-page/upload-icon.svg";

import { useWhisper } from "@chengsokdara/use-whisper";

import "./RightSide.css";
import { keyPointsGenerator } from "../../../../api/axiosFunctions";

const RightSide = ({setSummary}) => {
  const { transcript, startRecording, stopRecording } = useWhisper({
    apiKey: `${process.env.REACT_APP_OPENAI_API}`,
    streaming: true,
    timeSlice: 1_000, // 1 second
    whisperConfig: {
      language: "en",
    }, // YOUR_OPEN_AI_TOKEN
  });

  const [isStopped, setIsStopped] = useState(true);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  const handleListen = () => {
    if (isStopped) {
      stopRecording();
    } else {
      startRecording();
      console.log(note);
      setNote(transcript.text);
    }
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  //File Upload
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log("Image is uploading started");
      const i = event.target.files[0];
    } else {
      console.log("ERROR: IMAGE NOT UPLOADED");
    }
  };

  const goToGPT =  () => {
    console.log(note)
    keyPointsGenerator(transcript.text).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
          setSummary(resp.data)
      }
      else {
        console.log("Couldn't proceed");
      }
    });
  };

  useEffect(() => {
    handleListen();
  }, [isStopped]);
  return (
    <div className="mainPageRightSide">
      <div className="mainPageRightSideWrapper">
        <div className="mainPageRightSideTop">
          <h3>Start recording an audio</h3>
          <p>Make sure audio is in English, else it will be automatically translated to English</p>
        </div>

        <div className="mainPageRightSideInputBox">
          <div className="mainPageRightSideInputBoxLeftSide">
            <p>{transcript.text}</p>
          </div>
          <div className="mainPageRightSideInputBoxRightSide">
            {isStopped ? <span>🎙️</span> : <span>🛑🎙️</span>}
            <button onClick={handleSaveNote} disabled={!note} className="audioActionBtn">
              Save Note
            </button>
            {isStopped ? (
              <button onClick={() => setIsStopped(false)} className="audioActionBtn">Start</button>
            ) : (
              <button onClick={() => setIsStopped(true)} className="audioActionBtn">Stop</button>
            )}
          </div>
        </div>

        {transcript.text && isStopped && (
          <button onClick={goToGPT} className="mainPageRightSideSummarizeBtn">Summarize audio</button>
        )}

        <div className="mainPageRightSideUploadFile">
          <h3>Or upload the audio file of the recorded meeting</h3>
          <div className="mainPageRightSideUploadFileBox">
            <p className="mainPageRightSideUploadFileGrayTxt">
              {" "}
              MP3. Max 100mb.
            </p>
            <div>
              <img src={UploadIcon} />
              <p>Choose File</p>
              <input type="file" name="audio" accept="mp3/*" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RightSide;
