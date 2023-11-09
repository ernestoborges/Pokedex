import { useEffect, useState } from "react";
import styled from "styled-components";
import { isMobile } from 'react-device-detect';

export function DirectionalButtons({
    selectedItemIndex,
    moveSelectorUp,
    moveSelectorDown
}: {
    selectedItemIndex: number
    moveSelectorUp: (n: number) => void
    moveSelectorDown: (n: number) => void
}) {

    const [activeButton, setActiveButton] = useState<string | null>(null)

    function handleButtonUp() {
        setActiveButton("W");
        moveSelectorUp(1)
    }

    function handleButtonRight() {
        setActiveButton("D");
        moveSelectorDown(10)
    }

    function handleButtonDown() {
        setActiveButton("S");
        moveSelectorDown(1)
    }

    function handleButtonLeft() {
        setActiveButton("A");
        moveSelectorUp(10)
    }

    function handleKeyDown(e: any) {
        if (e.key === "w") {
            handleButtonUp()
        } else if (e.key === "s") {
            handleButtonDown()
        } else if (e.key === "d") {
            handleButtonRight()
        } else if (e.key === "a") {
            handleButtonLeft()
        }
    };

    function handleKeyUp() {
        setActiveButton(null);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [selectedItemIndex])

    return <>


        <Container
            activebutton={activeButton}
        >
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {
                isMobile
                    ? <div>
                        <UpDirectional
                            onTouchStart={() => handleButtonUp()}
                            onTouchEnd={() => setActiveButton(null)}
                        />
                        <RightDirectional
                            onTouchStart={() => handleButtonRight()}
                            onTouchEnd={() => setActiveButton(null)}
                        />
                        <DirectionalMiddle />
                        <DownDirectional
                            onTouchStart={() => handleButtonDown()}
                            onTouchEnd={() => setActiveButton(null)}
                        />
                        <LeftDirectional
                            onTouchStart={() => handleButtonLeft()}
                            onTouchEnd={() => setActiveButton(null)}
                        />
                    </div>
                    : <div>
                        <UpDirectional
                            onMouseDown={() => handleButtonUp()}
                            onMouseUp={() => setActiveButton(null)}
                        >
                            W
                        </UpDirectional>
                        <RightDirectional
                            onMouseDown={() => handleButtonRight()}
                            onMouseUp={() => setActiveButton(null)}
                        >
                            D
                        </RightDirectional>
                        <DirectionalMiddle />
                        <DownDirectional
                            onMouseDown={() => handleButtonDown()}
                            onMouseUp={() => setActiveButton(null)}
                        >
                            S
                        </DownDirectional>
                        <LeftDirectional
                            onMouseDown={() => handleButtonLeft()}
                            onMouseUp={() => setActiveButton(null)}
                        >
                            A
                        </LeftDirectional>
                    </div>
            }

        </Container>
    </>
}

const Container = styled.div<{ activebutton: string | null }>`
position: relative;

    & > div {
        display: grid;
        grid-template-columns: 3rem 3rem 3rem;
        grid-template-rows: 3rem 3rem 3rem;
    }

    & > div:first-child{
        & > div{
            width: 3rem;
            height: 3rem;
            background-color: var(--border-color);
            &:nth-child(1){
                border-radius: 0.4rem 0.4rem 0 0;
                grid-area: 1 / 2;
            }
            &:nth-child(2){
                border-radius: 0 0 0.4rem 0.4rem;
                grid-area: 3 / 2;
            }
            &:nth-child(3){
                border-radius: 0.4rem 0 0 0.4rem;
                grid-area: 2 / 1;
            }
            &:nth-child(4){
                border-radius:  0 0.4rem 0.4rem 0;
                grid-area: 2 / 3;
            }
            &:nth-child(5){
                grid-area: 2 / 2;
                background-color: var(--border-color);
            }
        }
    }

    & > div:nth-child(2) {
        position: absolute;
        width: 100%;
        height: 100%;
        top: -0.6rem;
        left: 0;
        transform: ${({ activebutton }) => {
        switch (activebutton) {
            case "W": return "rotateX(30deg) rotateY(0deg)";
            case "S": return "rotateX(10deg) rotateY(0deg) translateY(1px)";
            case "D": return "rotateX(20deg) rotateY(10deg)";
            case "A": return "rotateX(20deg) rotateY(-10deg)";
            default: return "rotateX(20deg) rotateY(0deg)";
        }
    }};
    }
`

const DirectionalButton = styled.button`
    width: 3rem;
    height: 3rem;
    background-color: #222222;
    color: white;
    border: 0;
    cursor: pointer;
`

const UpDirectional = styled(DirectionalButton)`
    border-radius: 0.4rem 0.4rem 0 0;
    grid-area: 1 / 2;
`
const DownDirectional = styled(DirectionalButton)`
    border-radius: 0 0 0.4rem 0.4rem;
    grid-area: 3 / 2;
`
const LeftDirectional = styled(DirectionalButton)`
    border-radius: 0.4rem 0 0 0.4rem;
    grid-area: 2 / 1;
`
const RightDirectional = styled(DirectionalButton)`
    border-radius:  0 0.4rem 0.4rem 0;
    grid-area: 2 / 3;
`
const DirectionalMiddle = styled.div`
    grid-area: 2 / 2;
    width: 3rem;
    height: 3rem;
    background-color: #222222;
`