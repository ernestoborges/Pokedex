import styled from "styled-components"
import { usePokemonList } from "../providers/PokemonListProvider"
import { useEffect, useState } from "react"
import { useSeachFilter } from "../providers/SearchFilterProvider"
import { keys } from "../utils/keyboard-keys"

export function ActionButtons({
    selectedItemId,
    pokemonListIndex,
    isDisable
}: {
    selectedItemId: number
    pokemonListIndex: number
    isDisable: boolean
}) {

    const { fetchPokemon } = usePokemonList()
    const { isKeyboardOpened, setIsKeyboardOpened, selectedKey, handleKeyAction } = useSeachFilter()
    const [keysPressed, setKeysPressed] = useState<{ [key: string]: boolean }>({});

    const keyMap = new Map([
        ['k', handleButtonK],
        ['l', handleButtonL],
    ])

    function handleButtonK() {
        if (isKeyboardOpened) {
            handleKeyAction(keys[selectedKey])
        } else {
            fetchPokemon(selectedItemId - 1)
        }
    }
    function handleButtonL() {
        setIsKeyboardOpened((prev: boolean) => !prev)
    }

    function handleKeyDown(e: any) {
        if (keyMap.has(e.key.toLowerCase())) {
            keyMap.get(e.key.toLowerCase())!()
        }

        setKeysPressed((prevState) => ({
            ...prevState,
            [e.key]: true,
        }));
    };

    function handleKeyUp(e: any) {
        setKeysPressed((prevState) => {
            const newState: Record<string, boolean> = { ...prevState };
            delete newState[e.key];
            return newState;
        });
    }

    useEffect(() => {
        if (!isDisable) {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [pokemonListIndex, isDisable, selectedItemId, isKeyboardOpened, selectedKey])

    return <>
        <ActionButtonsContainer>
            <AButton onClick={() => fetchPokemon(selectedItemId - 1)} isPressed={keysPressed["k"]}>
                <div>K</div>
            </AButton>
            <AButton onClick={() => setIsKeyboardOpened((prev: boolean) => !prev)} isPressed={keysPressed["l"]}>
                <div>L</div>
            </AButton>
        </ActionButtonsContainer>
    </>
}

const ActionButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const ActionButton = styled.button<{ isPressed: boolean }>`
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    background-color: var(--border-color);
    color: white;
    border: 0;
    position: relative;
    cursor: pointer;

    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        width: 100%;
        height: 100%;
        background-color: #222222;
        position: absolute;
        top: ${({ isPressed }) => isPressed ? "0" : "-0.6rem"};

        &:active {
            top: 0rem;
        }
    }
`

const AButton = styled(ActionButton)`
   
`