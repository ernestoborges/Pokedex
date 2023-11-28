import styled, { keyframes } from "styled-components"

export function PokeballSpinLoading() {

    return <Container>
        <Wrapper>
            <RedSide />
            <BlackStripe />
            <Circle>
                <div />
            </Circle>
            <WhiteSide />
        </Wrapper>
    </Container>
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Spin = keyframes`
    0% {
        transform: rotate(0deg)
    }
    100% {
        transform: rotate(360deg)
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 100%;
    overflow: hidden;
    border: 0.2rem solid var(--border-color);

    animation: ${Spin} 1s linear infinite;
`

const Sides = styled.div`
    height: 10rem;
    width: 20rem;
`

const RedSide = styled(Sides)`
    background-color: var(--red);
`

const WhiteSide = styled(Sides)`
    background-color: var(--light-gray);
`

const BlackStripe = styled.div`
    background-color: var(--border-color);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    height: 1.4rem;
    width: 100%;
`

const Circle = styled.div`
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    height: 7rem;
    width: 7rem;
    border-radius: 100%;
    background-color: var(--light-gray);
    border: 1rem solid var(--border-color);    

    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
        border-radius: 100%;
        border: 0.1rem solid var(--border-color);
        width: 80%;
        height: 80%;
    }
`