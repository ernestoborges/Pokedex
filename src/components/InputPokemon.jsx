import React from "react";

function InputPokemon(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  async function findPokemon(pokemon) {
    let filteredPokemonList = [];

    props.pokeList
      .filter((item) => item.name.includes(pokemon))
      .map((filteredItem) =>
        filteredPokemonList.push({
          name: filteredItem.name,
          id: filteredItem.id
        })
      );

    props.setPokeSearchList(filteredPokemonList);
    setIsLoading(false);
  }

  return (
    <div className="pokedex-search-bar">
      <input
        id="indexPokeName"
        type="text"
        onChange={(e) => {
          setIsLoading(true);
          findPokemon(e.target.value.toLowerCase());
        }}
        autoComplete="off"
      />
      <div className="search-input-button">
        <div className={isLoading ? "input-pokeball spin" : "input-pokeball"}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default InputPokemon;
