import React from "react";
import "./LeftSide.css";

const LeftSide = ({ summary, storyboard }) => {
  return (
    <div className="mainPageLeftSide">
      <div className="mainPageLeftSideWrapper">
        {summary && <div className="mainPageLeftSideTxtBox">{summary}</div>}
      </div>
    </div>
  );
};

export default LeftSide;
