import styled from "styled-components"
import { useInfoOption } from "../../providers/InfoOptionProvider"

export function SecondaryInfoDisplay() {

    const { option } = useInfoOption();

    function handleShowOption() {
        switch (option) {
            case 0: return <>a</>
            case 1: return <>b</>
            case 2: return <>c</>
            case 3: return <>d</>
            default: return false
        }
    }

    return <>
        <Container>
            <div>
                {handleShowOption()}
                <div className="overlay" />
            </div>
        </Container>
    </>
}

const Container = styled.div`
    background-color: var(--shadow-color);
    border-radius: 1rem;
    padding-top: 0.6rem;
    color: var(--shadow-color);
    
    & > div {
        position: relative;
        width: 18rem;
        height: 16rem;
        background-color: white;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: var(--light-gray);
    }
`