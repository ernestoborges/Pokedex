import styled from "styled-components"
import { useInfoOption } from "../../providers/InfoOptionProvider"
import { useEffect, useState } from "react";

export function OptionButton({ keyName, option }: { keyName: string, option: number }) {

    const { option: selectedOption, setOption } = useInfoOption()

    function handleClick() {
        setOption(option)
    }

    const [keyPressed, setKeyPressed] = useState<boolean>(false);

    function handleKeyDown(e: any) {
        if (e.key.toLowerCase() === keyName.toLocaleLowerCase()) {
            setKeyPressed(true);
            if(selectedOption !== option){
                setOption(option)
            }
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

    return <>
        <Container
            isActive={keyPressed}
        >
            <button
                onClick={() => handleClick()}
            >
                {keyName}
            </button>
        </Container>
    </>
}

const Container = styled.div<{ isActive: boolean }>`

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
        top: ${({isActive})=> isActive ? "0" : "-0.6rem"};
        cursor: pointer;

        &:active {
            top: 0;
        }
     }
`