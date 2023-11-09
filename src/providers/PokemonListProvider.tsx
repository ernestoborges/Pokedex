import { createContext, useContext, useEffect, useState } from "react";


interface IPokemonList {
    name: string,
    url: string
}

interface IPokemonListContext {
    selectedPokemon: any;
    pokemonList: IPokemonList[];
    fetchPokemon: (pokemonListIndex: number) => void
}

const PokemonListContext = createContext<IPokemonListContext | null>(null);

export function PokemonListProvider({ children }: { children: React.ReactNode }) {

    const [pokemonList, setPokemonList] = useState<IPokemonList[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    async function fetchPokemon(pokemonListIndex: number) {
        if (pokemonList) {
            let url = pokemonList[pokemonListIndex].url
            let response = await fetch(
                url,
                { method: "GET" }
            )
            let data = await response.json()
            let specieUrl = data.species.url
            let specieResponse = await fetch(
                specieUrl,
                { method: "GET" }
            )
            let speciaData = await specieResponse.json()

            setSelectedPokemon({
                ...data,
                specie_data: {
                    ...speciaData
                }
            })
        }
    }

    async function fetchPokemonList() {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=807&offset=0`
        let response = await fetch(
            url,
            { method: "GET" }
        )
        let data = await response.json()
        setPokemonList(data.results)
    }

    useEffect(() => {
        fetchPokemon(0)
    }, [pokemonList])

    useEffect(() => {
        fetchPokemonList();
    }, [])

    return (
        <PokemonListContext.Provider value={{ pokemonList, fetchPokemon, selectedPokemon }}>
            {children}
        </PokemonListContext.Provider>
    );
}

export function usePokemonList() {
    const context = useContext(PokemonListContext);
    if (!context) {
        throw new Error('usePokemonList deve ser usado dentro de um PokemonListProvider');
    }
    return context;
}



