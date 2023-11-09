import styled from "styled-components"
import { usePokemonList } from "../providers/PokemonListProvider"
import { PokemonIco } from "./PokemonIco"
import { useRef, useState } from "react"
import { DirectionalButtons } from "./DirectionalButtons"
import React from "react"
import { ActionButtons } from "./ActionButtons"
import { fixedNameMap } from "../utils/pokemons-fixed-names"

const itemHeight = 34

const ListItem = React.memo(({
    index,
    pokemon,
    isSelected,
    setSelectedItemIndex
}: {
    index: number
    pokemon: { name: string, url: string }
    isSelected: boolean
    setSelectedItemIndex: (n: number) => void
}) => {
    let id = pokemon.url.split("pokemon/")[1].slice(0, -1)
    let fixedName
    if (pokemon.name.includes("-")) {
        const data = fixedNameMap.get(pokemon.name)
        fixedName = data!.name
    }
    return (
        <li
            onClick={() => setSelectedItemIndex(index)}
            style={{ cursor: "pointer" }}
        >
            <PokemonIco
                className={isSelected ? "wiggle" : ""}
                id={id}
                name={pokemon.name}
            />
            <PokeName>{fixedName ? fixedName : pokemon.name}</PokeName>
            <span>#{id.padStart(3, "0")}</span>
            {
                isSelected &&
                <ItemBorder>
                    <div>
                        <div></div>
                    </div>
                </ItemBorder>
            }

        </li>
    );
})

export function SearchDisplay() {

    const pokemonList = usePokemonList().pokemonList
    const listSize = pokemonList.length

    const [selectedItemIndex, setSelectedItemIndex] = useState(0)

    const listRef: React.RefObject<HTMLUListElement> = useRef(null);

    function moveSelectorUp(n: number) {
        if (selectedItemIndex > n - 1) {
            let newSelectionPosition = selectedItemIndex - n
            setSelectedItemIndex(newSelectionPosition)
            if (listRef.current) {
                let currentScrollY = listRef.current.scrollTop
                if (
                    newSelectionPosition * itemHeight < currentScrollY ||
                    newSelectionPosition * itemHeight > currentScrollY + (itemHeight * 5)
                ) {
                    listRef.current.scrollTop = newSelectionPosition * itemHeight
                }
            }
        }
    }

    function moveSelectorDown(n: number) {
        if (selectedItemIndex < listSize - n) {
            let newSelectionPosition = selectedItemIndex + n
            setSelectedItemIndex(newSelectionPosition)

            if (listRef.current) {
                let currentScrollY = listRef.current.scrollTop
                if (
                    newSelectionPosition * itemHeight < currentScrollY ||
                    newSelectionPosition * itemHeight > currentScrollY + (itemHeight * 4)
                ) {
                    listRef.current.scrollTop = (newSelectionPosition * itemHeight) - (itemHeight * 4)
                }
            }
        }
    }

    return <>
        <Container>
            <DirectionalButtons
                selectedItemIndex={selectedItemIndex}
                moveSelectorUp={moveSelectorUp}
                moveSelectorDown={moveSelectorDown}
            />
            <DisplayContainer>
                <Wrapper>
                    <div className="overlay" />
                    <ul ref={listRef}>
                        {
                            !pokemonList
                                ? "Loading..."
                                : pokemonList.map((pokemon, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            index={index}
                                            pokemon={pokemon}
                                            isSelected={index === selectedItemIndex}
                                            setSelectedItemIndex={setSelectedItemIndex}
                                        />
                                    )
                                }
                                )
                        }
                    </ul>
                </Wrapper>
            </DisplayContainer>
            <ActionButtons pokemonListIndex={selectedItemIndex} />
        </Container>
    </>
}

const Container = styled.section`
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0 2rem;
`

const DisplayContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background-color: white;
    width: 22.6rem;
    overflow: hidden;
    border-radius: 1rem;
    padding: 0rem;
    background-color: var(--shadow-color);
    padding-top: 0.4rem;

`

const Wrapper = styled.div`
    position: relative;
    width: 25.6rem;
    height: calc(${itemHeight} * 5px + 3px);
    background-color: white;
    border-radius: 1rem;
    overflow: hidden;

    & > ul {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        padding: 0.2rem;

        & li {
            position: relative;
            color: var(--game-font-color);
            padding: 0.2rem 1rem 0.2rem 0;
            display: flex;
            align-items: flex-end;
            gap: 0.4rem;
            font-size: 1.2rem;
            text-transform: capitalize;
            letter-spacing: 0.1rem;
            text-shadow: 
                0px 1px 0px var(--game-font-shadow),
                1px 0px 0px var(--game-font-shadow),
                1px 1px 0px var(--game-font-shadow)
            ;

            & > span {
                line-height: 1.4rem;
                padding: 0.6rem 0;
            }

            & .wiggle {
                // transform: scaleY(-1);
                animation: 0.3s wiggle linear infinite;
            }
        }
    }
`

const ItemBorder = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    border: 0.2rem solid white;
    border-radius: 1rem;
    display: flex;
    box-shadow: 
        1px 1px 0px var(--cyan),
        -1px -1px 0px var(--cyan),
        -1px 1px 0px var(--cyan),
        1px -1px 0px var(--cyan),
        inset 1px 1px 0px var(--cyan),
        inset -1px -1px 0px var(--cyan),
        inset -1px 1px 0px var(--cyan),
        inset 1px -1px 0px var(--cyan)
        ;

    
`

const PokeName = styled.span`
    flex-grow: 1;
    overflow: hidden;
    display: flex;
`