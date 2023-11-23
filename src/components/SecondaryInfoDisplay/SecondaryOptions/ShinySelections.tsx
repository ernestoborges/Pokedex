import styled from "styled-components"
import { usePokemonList } from "../../../providers/PokemonListProvider"

export function ShinySelection() {

    const { isShiny, toggleShiny } = usePokemonList();

    return <>
        <Container onClick={() => toggleShiny()}>
            <span>Shiny:</span>
            <span>
                {isShiny ? "YES" : "NO"}
            </span>
        </Container>
    </>
}

const Container = styled.div`
    padding: 0.6rem 0;
    cursor: pointer;
`