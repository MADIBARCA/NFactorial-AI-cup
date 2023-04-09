import React, { useState, useEffect } from "react";
import UploadIcon from "../../assets/main-page/upload-icon.svg";

import { useWhisper } from "@chengsokdara/use-whisper";

import "./MainPage.css";
import LeftSide from "./components/left-side/LeftSide";
import RightSide from "./components/right-side/RightSide";

const MainPage = () => {
  const [summary, setSummary] = useState("");

  const storyboard = ""

  return (
    <div className="mainPage">
        <LeftSide summary={summary} storyboard={storyboard}/>
        <RightSide setSummary={setSummary}/>
    </div>
  );
};

export default MainPage;
