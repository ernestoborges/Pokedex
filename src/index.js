import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import Pokedex from "./components/Pokedex";

export default function App() {
  const [pokeList, setPokeList] = React.useState([]);

  async function fetchPokemonList() {
    const pokemonList = [];
    let apiResponse = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=1154"
    );
    let data = await apiResponse.json();
    data.results.map((item) => {
      return pokemonList.push({
        name: item.name,
        url: item.url,
        id: item.url.slice(34, item.url.length - 1)
      });
    });
    setPokeList(pokemonList);
  }

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return <Pokedex pokeList={pokeList} />;
}

const rootElement = document.getElementById("root");

createRoot(rootElement).render(<App tab="home" />);
