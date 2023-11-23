import styled from "styled-components"

export function PokemonIco({
    id,
    name,
    className
}: {
    id: string,
    name: string,
    className?: string
}) {

    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${id}.png`

    return <>
        <Container>
            <img
                className={className}
                src={url}
                alt={`${name} Pokemon icon`}
            />
        </Container>
    </>
}

const Container = styled.div`
    transform: scaleX(-1);
    display: flex;
`