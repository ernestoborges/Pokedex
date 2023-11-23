import { createContext, useContext, useEffect, useState } from "react";


interface IPokemonList {
    name: string,
    url: string
}

interface IPokemonListContext {
    selectedPokemon: any;
    pokemonList: IPokemonList[];
    fetchPokemon: (pokemonListIndex: number) => void
    isShiny: boolean
    toggleShiny: () => void
}

const PokemonListContext = createContext<IPokemonListContext | null>(null);

export function PokemonListProvider({ children }: { children: React.ReactNode }) {

    const [pokemonList, setPokemonList] = useState<IPokemonList[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [isShiny, setIsShiny] = useState(false);

    async function fetchPokemon(pokemonListIndex: number) {
        if (pokemonList) {
            //pokemon data
            let url = pokemonList[pokemonListIndex].url
            let response = await fetch(
                url,
                { method: "GET" }
            )
            let data = await response.json()

            //specie data
            let specieUrl = data.species.url
            let specieResponse = await fetch(
                specieUrl,
                { method: "GET" }
            )
            let specieData = await specieResponse.json()
            
            //evolution chain data
            let evoChainUrl = specieData.evolution_chain.url
            let evoChainResponse = await fetch(
                evoChainUrl,
                { method: "GET" }
            )
            let evoChainData = await evoChainResponse.json()


            setSelectedPokemon({
                ...data,
                specie_data: {
                    ...specieData
                },
                evo_chain_data:{
                    ...evoChainData
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

    function toggleShiny() {
        setIsShiny(!isShiny)
        console.log(selectedPokemon)
    }

    useEffect(() => {
        fetchPokemon(0)
    }, [pokemonList])

    useEffect(() => {
        fetchPokemonList();
    }, [])

    return (
        <PokemonListContext.Provider value={{
            pokemonList,
            fetchPokemon,
            selectedPokemon,
            isShiny,
            toggleShiny
        }}>
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



