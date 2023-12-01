import styled from "styled-components"
import { useSeachFilter } from "../../providers/SearchFilterProvider"
import { keys } from "../../utils/keyboard-keys"
import { useEffect, useState } from "react"
import { useBeepAudio } from "../../providers/BeepAudioProvider"

function Key({
    name,
    keyIndex,
    selectedKey,
    setSelectedKey,
    className,
    handleKeyAction
}: {
    name: string
    keyIndex: number
    selectedKey: boolean
    setSelectedKey: (n: number) => void
    className?: string
    handleKeyAction: (key: string) => void
}) {

    function handleClick() {
        handleKeyAction(name)
        setSelectedKey(keyIndex)
    }

    return <KeyContainer className={`${className ? className : ""} ${selectedKey ? "selected-key" : ""}`}>
        <button
            onClick={handleClick}
        >
            {name}
        </button>
    </KeyContainer>
}

export function Keyboard() {

    const {
        isKeyboardOpened,
        filterText,
        setFilterText,
        selectedKey,
        setSelectedKey,
        setIsInputFocus,
        isInputFocus,
        handleKeyAction
    } = useSeachFilter();

    const { playBeep, playSwipeIn, playSwipeOut } = useBeepAudio()!;

    const [fistRender, setFirstRender] = useState(true);


    function handleSelectedKey(index: number) {
        return selectedKey === index
    }

    useEffect(() => {
        if (!fistRender) {
            if (!isKeyboardOpened) {
                playSwipeOut()
            } else {
                playSwipeIn()
            }
        } else {
            setFirstRender(false)
        }
    }, [isKeyboardOpened])

    useEffect(() => {
        if (!fistRender) {
            playBeep()
        } else {
            setFirstRender(false)
        }
    }, [filterText, selectedKey])

    return <Container
        style={{
            bottom: isKeyboardOpened ? "0" : "-100%"
        }}
    >
        <Input
            value={filterText}
            onChange={(e) => setFilterText(e.target.value.toLocaleUpperCase())}
            onFocus={() => { setIsInputFocus(true); console.log(isInputFocus) }}
            onBlur={() => { setIsInputFocus(false); console.log(isInputFocus) }}
        />
        <Grid>
            {
                keys.map((key: string, i: number) =>
                    <Key
                        key={i}
                        name={key}
                        keyIndex={i}
                        selectedKey={handleSelectedKey(i)}
                        setSelectedKey={setSelectedKey}
                        handleKeyAction={handleKeyAction}
                    />
                )
            }
        </Grid>
    </Container>
}

const Container = styled.div`
    position: absolute;
    background-color: var(--border-color);
    width: 100%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border: 0.1rem solid var(--border-color);
    border-radius: 0.4rem;
    padding-bottom: 0.4rem;
    transition: bottom 0.2s linear;
`

const Grid = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: auto;
    border: 0.1rem solid white;
`

const Input = styled.input`
    width: 100%;
    padding: 0.4rem;
    font-weight: bold;
    vertical-align: bottom;
    box-sizing: border-box;
`

// key

const KeyContainer = styled.li`
    width: 100%;
    height: 100%;
    display: flex;
    border: 0.1rem solid #211831;
    overflow: hidden;

    & > button {
        width: 100%;
        height: 100%;
        padding: 0.6rem 0 0.3rem;
        border: 0;
        background: rgb(90,90,156);
        background: linear-gradient(180deg, rgba(90,90,156,1) 28%, rgba(57,57,107,1) 37%);
        color: white;
        cursor: pointer;

        &:hover {
            background: rgba(90,90,156,1);
        }
    }

    &.selected-key {
        border: 0.1rem solid var(--light-gray);
        border-radius: 0.4rem;
        position: relative;
        transform: scale(1.2);
    }
`