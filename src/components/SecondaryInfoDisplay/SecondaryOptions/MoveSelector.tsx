import styled from "styled-components"

export function MoveSelector({
    move,
    fetchMove,
    setSelectedItem,
    index
}: {
    move: any
    fetchMove: (url: string) => void
    setSelectedItem: (n: number) => void
    index: number
}) {

    return <Container
        key={index}
        onClick={() => {
            fetchMove(move.move.url)
            setSelectedItem(index)
        }}
    >
        {move.move.name.split("-").join(" ")}
    </Container>

}

const Container = styled.div`
    text-transform: uppercase;
    padding: 0.4rem 0 0.2rem;
    cursor: pointer;
    height: 2.1rem;
`