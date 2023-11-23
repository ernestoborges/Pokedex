import styled from "styled-components"
import { BsCaretRightFill } from "react-icons/bs";

export function ReadDescription({
    handlePlayDescription
}: {
    handlePlayDescription: () => void
}) {

    return <>
        <Container>
            <Button onClick={() => handlePlayDescription()}>
                <BsCaretRightFill />
                Read
            </Button>
        </Container>
    </>
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 0.6rem 0;
    cursor: pointer;
`

const Button = styled.div`
    border: 0.1rem solid var(--dark-gray);
    padding: 0.6rem;
    padding-bottom: 0.2rem;
    border-radius: 0.4rem;
    background-color: white;
`