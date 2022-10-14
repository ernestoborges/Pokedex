import React from "react";

function CryOption(props) {
  const url =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
    props.id +
    ".png";
  const newAudio =
    "https://veekun.com/dex/media/pokemon/cries/" + props.id + ".ogg";

  const audioRef = React.useRef();

  // function UpdateAudio() {
  //   if (audioRef.current) {
  //     audioRef.current.load();
  //   }
  // }

  // if (props.isAudioUpdated === false) {
  //   UpdateAudio();
  //   props.setIsAudioUpdated(true);
  // }

  // let audioCtx = props.audioCtx;
  // const track = props.audioCtx.createMediaElementSource(audioRef);

  // audioRef.current.addEventListener("play", () => {
  //   if (audioCtx.state === "suspended") {
  //     audioCtx.resume();
  //   }
  // });

  // track.connect(audioCtx.destination);

  return (
    <div>
      <div className="screen-header">
        <div className="status-icon"></div>
        <div className="status-title">
          <p>CRY</p>
        </div>
      </div>
      <div className="screen-body">
        <div className="status-img-container">
          <img className="status-img" src={url} alt="" />
        </div>
        <div className="player-container">
          <audio id="cry-audio" src={newAudio} ref={audioRef}>
            {/* <source id="cry-source" src={newAudio} type="audio/ogg" /> */}
          </audio>
          <button
            className="cry-play-btn"
            onClick={() => {
              audioRef.current.play();
            }}
          >
            <div></div>
          </button>
        </div>
      </div>
      <div className="screen-footer"></div>
    </div>
  );
}

export default CryOption;
