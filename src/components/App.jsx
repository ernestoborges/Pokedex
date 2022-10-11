import React from "react";
import "../styles.css";
import Pokedex from "./Pokedex";

const audioCtx = new AudioContext();
function App() {
  return <Pokedex audioCtx={audioCtx} />;
}

export default App;
