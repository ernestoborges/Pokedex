import styled from "styled-components"
import { usePokemonList } from "../../../providers/PokemonListProvider";
import { useEffect } from "react";
import { PokemonIco } from "../../PokemonIco";

export function EvolvesFrom({
    from,
    selectedItem,
    isThisSelected,
    isItemSelected,
}: {
    from: any[],
    selectedItem: number,
    isThisSelected: boolean,
    isItemSelected: boolean,
}) {

    const { fetchPokemon } = usePokemonList()!;

    useEffect(() => {
        if (!isItemSelected && isThisSelected && selectedItem !== -1) {
            fetchPokemon(from[selectedItem].id - 1)
        }
    }, [isItemSelected])

    return <>
        <Container>
            <div>EVOLVES FROM:</div>
            <ul>
                {
                    from.map((evo, index) =>
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