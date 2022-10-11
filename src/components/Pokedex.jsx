import React, { useEffect } from "react";
import Pokemon from "./Pokemon";
import SearchScreen from "./SearchScreen";
import InputPokemon from "./InputPokemon";
import Arrows from "./Arrows";
import TopSectionL from "./TopSectionL";
import TopSectionR from "./TopSectionR";
import StatusScreen from "./StatusScreen";
import MovesScreen from "./MovesScreen";

function Pokedex(props) {
  const [selectedPokemon, setSelectedPokemon] = React.useState(1);
  const [pokeData, setPokeData] = React.useState({
    abilities: [
      { ability: { name: "overgrow" } },
      { ability: { name: "chlorophyll" } }
    ],
    name: "bulbasaur",
    id: "1",
    weight: "10",
    height: "10",
    types: [
      { slot: 1, type: { name: "grass" } },
      { slot: 2, type: { name: "poison" } }
    ],
    shape: "quadruped",
    stats: ["10", "10", "10", "10", "10", "10"]
  });
  const [pokeSpecieData, setPokeSpecieData] = React.useState({
    flavor_text_entries: [{ flavor_text: "Pokemon Description" }],
    habitat: { name: "grassland" },
    shape: { name: "quadruped" }
  });
  const [pokeSearchList, setPokeSearchList] = React.useState([]);
  const [menuState, setMenuState] = React.useState("info");
  const [isAudioUpdated, setIsAudioUpdated] = React.useState(false);

  function updatePokemonData(data, specieData) {
    setPokeData(data);
    setPokeSpecieData(specieData);
    setIsAudioUpdated(false);
  }

  async function fetchPokemonUniqueData() {
    let url = "https://pokeapi.co/api/v2/pokemon/" + selectedPokemon;
    let apiResponse = await fetch(url);
    let data = await apiResponse.json();
    url = "https://pokeapi.co/api/v2/pokemon-species/" + selectedPokemon;
    apiResponse = await fetch(url);
    let specieData = await apiResponse.json();

    updatePokemonData(data, specieData);
  }

  useEffect(() => {
    fetchPokemonUniqueData();
  });

  return (
    <div className="pokedex">
      <div className="pokedex-L">
        <TopSectionL />
        <div className="pokedex-bottom-section">
          <div className="pokedex-screen-container pokedex-component">
            <div className="screen-top-container"></div>
            <div className="pokedex-screen position-relative crt">
              <Pokemon id="Pokemon" Name={pokeData.name} />
            </div>
            <div className="screen-bottom-container">
              <div className="screen-red-light">
                <div className="red-light-inner"></div>
              </div>
              <div className="switch-container">
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      document
                        .querySelector(".pokedex-screen")
                        .classList.toggle("crt");
                      document
                        .querySelector(".search-screen")
                        .classList.toggle("crt");
                      document
                        .querySelector(".status-screen")
                        .classList.toggle("crt");
                      document
                        .querySelector(".moves-screen-container")
                        .classList.toggle("crt");
                    }}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="screen-speaker">
                <div className="speaker-bar"></div>
                <div className="speaker-bar"></div>
                <div className="speaker-bar"></div>
              </div>
            </div>
          </div>
          <div className="pokedex-component flex-row-spacebetween">
            <div className="round-button"></div>
            <div className="search-screen crt position-relative">
              <SearchScreen
                list={pokeSearchList}
                setSelectedPokemon={setSelectedPokemon}
                fetchPokemonUniqueData={fetchPokemonUniqueData}
              />
              <InputPokemon
                pokeList={props.pokeList}
                setPokeSearchList={setPokeSearchList}
              />
            </div>
            <Arrows />
          </div>
        </div>
      </div>
      <div className="pokedex-R">
        <TopSectionR />
        <div className="pokedex-bottom-section-R">
          <StatusScreen
            id={pokeData.id}
            data={pokeData}
            specieData={pokeSpecieData}
            menuState={menuState}
            isAudioUpdated={isAudioUpdated}
            setIsAudioUpdated={setIsAudioUpdated}
            audioCtx={props.audioCtx}
          />
          <div className="option-buttons-container">
            <button
              className="option-button info-button"
              onClick={() => {
                return setMenuState("info");
              }}
            >
              INFO
            </button>
            <button
              className="option-button stats-button"
              onClick={() => {
                return setMenuState("stats");
              }}
            >
              STATS
            </button>
            <button
              className="option-button description-button"
              onClick={() => {
                return setMenuState("description");
              }}
            >
              DESC
            </button>
            <button
              className="option-button cryoption-button"
              onClick={() => {
                return setMenuState("cry");
              }}
            >
              CRY
            </button>
          </div>
          <div className="evo-move-container">
            <MovesScreen movesList={pokeData.moves} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
