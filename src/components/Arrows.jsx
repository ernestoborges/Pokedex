import React from "react";

function Arrows() {
  return (
    <div className="arrows-container">
      <button className="arrow arrow-up">
        <div className="arrow-icon orientation-up"></div>
      </button>
      <button className="arrow arrow-down">
        <div className="arrow-icon orientation-down"></div>
      </button>
      <button className="arrow arrow-left">
        <div className="arrow-icon orientation-left"></div>
      </button>
      <button className="arrow arrow-right">
        <div className="arrow-icon orientation-right"></div>
      </button>
      <div className="arrow arrow-middle">
        <div className="arrow-middle-circle"></div>
      </div>
    </div>
  );
}

export default Arrows;
