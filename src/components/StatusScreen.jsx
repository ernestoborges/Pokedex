import React from "react";
import StatsOption from "./menuOptions/StatsOption.jsx";
import InfoOption from "./menuOptions/InfoOption.jsx";
import DescriptionOption from "./menuOptions/DescriptionOption.jsx";
import CryOption from "./menuOptions/CryOption.jsx";

function StatusScreen(props) {
  function switchOption(option) {
    switch (option) {
      case "info":
        return <InfoOption id={props.id} data={props.data} />;
      case "stats":
        return <StatsOption id={props.id} data={props.data} />;
      case "description":
        return (
          <DescriptionOption
            id={props.id}
            data={props.data}
            specieData={props.specieData}
          />
        );
      case "cry":
        return (
          <CryOption
            id={props.id}
            isAudioUpdated={props.isAudioUpdated}
            setIsAudioUpdated={props.setIsAudioUpdated}
            audioCtx={props.audioCtx}
          />
        );
      default:
        break;
    }
  }

  return (
    <div className="status-screen position-relative crt">
      {switchOption(props.menuState, props)}
    </div>
  );
}

export default StatusScreen;
