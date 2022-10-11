import React from "react";

function PokemonIco(props) {
  const icoURLStart =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/";
  const icoURL = icoURLStart + props.id + ".png";
  const notSeen = "/images/not-seen2.png";

  return (
    <img
      className="pokemon-search-icon"
      src={icoURL}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = notSeen;
      }}
      alt=""
    />
  );
}

export default PokemonIco;
