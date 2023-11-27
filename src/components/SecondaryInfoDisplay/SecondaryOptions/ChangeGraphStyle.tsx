import styled from "styled-components"

export function GraphStyle({
    isGraphHex,
    graphToggle
}: {
    isGraphHex: boolean,
    graphToggle: () => void
}) {

    
    return <>
        <Container
            onClick={() => graphToggle()}
        >
            <span>Graph Style:</span>
            <span>{isGraphHex ? "Hexbin" : "Bars"}</span>
        </Container>
    </>
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    cursor: pointer;
`