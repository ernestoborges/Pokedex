import React from "react";
import PokemonListItem from "./PokemonListItem";

function SearchScreen(props) {
  return (
    <div className="pokemon-search-screen">
      <ul className="pokemon-search-list scrollable">
        {props.list.map((poke) => (
          <PokemonListItem
            key={poke.id}
            name={poke.name}
            id={poke.id}
            setSelectedPokemon={props.setSelectedPokemon}
            fetchPokemonUniqueData={props.fetchPokemonUniqueData}
          />
        ))}
      </ul>
    </div>
  );
}

export default SearchScreen;
