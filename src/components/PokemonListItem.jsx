import React from "react";
import PokemonIco from "./PokemonIco";

function PokemonListItem(props) {
  return (
    <li
      className="search-list-item"
      onClick={() => {
        props.setSelectedPokemon(props.id);
      }}
    >
      <div className="name-icon-container">
        <PokemonIco id={props.id} />

        <p className="item-pokemon-name">
          {props.name.length > 15
            ? props.name.charAt(0).toUpperCase() +
              props.name.slice(1).substring(0, 15) +
              "..."
            : props.name.charAt(0).toUpperCase() + props.name.slice(1)}
        </p>
      </div>
      <p className="item-pokemon-id">
        <span className="custom-font">#</span>
        {props.id}
      </p>
    </li>
  );
}

export default PokemonListItem;
