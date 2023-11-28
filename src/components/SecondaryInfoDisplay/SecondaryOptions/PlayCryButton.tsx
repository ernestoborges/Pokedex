import styled from "styled-components"
import { useCryAudio } from "../../../providers/CryAudioProvider"
import { BsCaretRightFill } from "react-icons/bs";


export function PlayCryButton() {

    const { playCry } = useCryAudio()!
    return <>
        <Container>
            <Button onClick={() => playCry()}>
                <BsCaretRightFill  />
                <span>Play</span>
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
    border: 0.1rem solid var(--dark-gray);
    color: var(--dark-gray);
    border-radius: 0.4rem;
    display: flex;
    align-items: center;
    font-weight: bold;
    cursor:pointer;
    
    & > span {
        margin-top: 0.3rem;
    }
    
    & > svg {
        font-size: 2rem;
    }
`