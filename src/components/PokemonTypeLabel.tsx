import styled from "styled-components"

export function PokemonTypeLabel({ type }: { type: string }) {


    return <>
        <Container>
            <div
                style={{ background: `var(--type-${type})` }}
            >
                {type.toUpperCase()}
            </div>
        </Container>
    </>
}

const Container = styled.div`
    color: white;
    & > div {
        width: 6.4rem;
        letter-spacing: 0.1rem;
        text-shadow: none;
        font-size: 1rem;
        border-radius: 0.4rem;
        border: 0.2rem solid var(--dark-gray);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 0.4rem;
        text-shadow: 
                0px 1px 0px var(--game-font-shadow),
                1px 0px 0px var(--game-font-shadow),
                1px 1px 0px var(--game-font-shadow),
            ;
    }
`