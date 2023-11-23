import styled from "styled-components"
import { PokemonIco } from "../../PokemonIco"
import { useEffect } from "react"
import { usePokemonList } from "../../../providers/PokemonListProvider"

export function EvolvesTo({
    to,
    selectedItem,
    isThisSelected,
    isItemSelected
}: {
    to: any[],
    selectedItem: number,
    isThisSelected: boolean,
    isItemSelected: boolean
}) {

    const { fetchPokemon } = usePokemonList()!;

    useEffect(() => {
        if (!isItemSelected && isThisSelected && selectedItem !== -1) {
            fetchPokemon(to[selectedItem].id - 1)
        }
    }, [isItemSelected])

    return <>
        <Container>
            <div>EVOLVES TO:</div>
            <ul>
                {
                    to.map((evo, index) =>
                        <li
                            key={index}
                            className={index === selectedItem ? "selected-chain" : ""}
                            onClick={() => fetchPokemon(evo.id - 1)}
                        >
                            <PokemonIco
                                id={evo.id}
                                name={evo.name}
                            />
                        </li>
                        )
                }
            </ul>
        </Container>
    </>
}

const Container = styled.div`
    padding: 0.6rem 0;

    & > ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
        justify-items: center;

        & > li {
            &:hover {
                background-color: var(--shadow-color);
                cursor: pointer;
            }
        }
    }

    & .selected-chain {
        background-color: var(--shadow-color);
    }
`