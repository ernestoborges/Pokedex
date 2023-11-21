import styled from "styled-components"
import { useCryAudio } from "../../../providers/CryAudioProvider"
import { BsCaretRightFill } from "react-icons/bs";


export function PlayCryButton() {

    const { playCry } = useCryAudio()!
    return <>
        <Container>
            <Button onClick={() => playCry()}>
                <BsCaretRightFill  />
                Play
            </Button>
        </Container>
    </>
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.4rem 0;
`

const Button = styled.button`
    padding: 0.6rem;
    border: 0.1rem solid var(--border-color);
    border-radius: 0.4rem;
    display: flex;
    align-items: center;

    & > svg {
        font-size: 2rem;
    }
`