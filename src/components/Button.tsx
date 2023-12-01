import styled from "styled-components"
import { useEffect, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

export function Button({
    keyName,
    keyLabel,
    shape,
    functionHandler,
    selectedOption,
    isDisable
}: {
    keyName: string,
    keyLabel: string | React.ReactElement,
    shape: "square" | "circle" | "arrow-up" | "arrow-down"
    functionHandler: () => void
    selectedOption: number[]
    isDisable: boolean
}) {

    const [keyPressed, setKeyPressed] = useState<boolean>(false);


    function handleClick() {
        functionHandler()
    }

    function handleKeyDown(e: any) {
        if (e.key === keyName && !isDisable) {
            setKeyPressed(true);
            functionHandler()
        }
    };

    function handleKeyUp() {
        setKeyPressed(false);
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);

        };
    }, [selectedOption])

    switch (shape) {
        case "square":
            return <>
                <Container
                    isActive={keyPressed}
                >
                    <button
                        onClick={() => handleClick()}
                    >
                        {keyLabel}
                    </button>
                </Container>
            </>
        case "circle":
            return <>
                <Container
                    isActive={keyPressed}
                >
                    <button
                        onClick={() => handleClick()}
                    >
                        {keyLabel}
                    </button>
                </Container>
            </>
        case "arrow-up":
            return <>
                <ArrowUpContainer
                    isActive={keyPressed}
                    onClick={() => handleClick()}
                >
                    <div />
                    <button
                    >
                        <BiSolidUpArrow />
                    </button>
                </ArrowUpContainer>
            </>
        case "arrow-down":
            return <>
                <ArrowDownContainer
                    isActive={keyPressed}
                    onClick={() => handleClick()}
                >
                    <div>
                        <div />
                        <BiSolidDownArrow />
                    </div>
                    <button
                    >
                        <BiSolidDownArrow />
                    </button>
                </ArrowDownContainer>
            </>
    }


}

const Container = styled.div<{ isActive: boolean }>`

    flex-grow: 1;
    background-color: var(--border-color);
    width: 100%;
    height: 3rem;
    border-radius: 1rem;

    & > button {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        border: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #222222;
        color: white;
        font-weight: bold;

        position: relative;
        top: ${({ isActive }) => isActive ? "0" : "-0.6rem"};
        cursor: pointer;

        &:active {
            top: 0;
        }
     }
`

const ArrowUpContainer = styled.div<{ isActive: boolean }>`
    position: relative;
    height: 3.2rem;
    
    & > div {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: ${({ isActive }) => isActive ? "transparent" : "var(--border-color)"}; ;
        width: 3.3rem;
        height: 0.7rem;
        border-radius: 0 0 0.2rem 0.2rem;
    }
    & > button {
        position: relative;
        top: ${({ isActive }) => isActive ? "" : "-0.6rem"};
        border: 0;
        background-color: transparent;
        color: #222222;
        font-size: 4rem;
        cursor: pointer;
     
    }

    &:active {
        & > div {
            background-color: transparent;
        }
        & > button {
            top: 0;
        }
    }
`

const ArrowDownContainer = styled.div<{ isActive: boolean }>`
    position: relative;
    top: -0.6rem;
    
    & > div {
        & > div {
            position: absolute;
            background-color: ${({ isActive }) => isActive ? "transparent" : "var(--border-color)"}; ;
            font-size: 4rem;
            width: 3.4rem;
            height: 0.7rem;
            border-radius: 0 0 0.2rem 0.2rem;
            top: 0.4rem;
            left: 50%;
            transform: translateX(-50%);
        }

        & > svg {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            font-size: 4rem;
            color: var(--border-color);


        }
    }
    & > button {
        position: relative;
        top: ${({ isActive }) => isActive ? "" : "-0.6rem"};
        border: 0;
        background-color: transparent;
        color: #222222;
        font-size: 4rem;
        cursor: pointer;
    }

    &:active {
        & > div {
            & > div {
                background-color: transparent;
            }
        }
        & > button {
            top: 0;
        }
    }
`