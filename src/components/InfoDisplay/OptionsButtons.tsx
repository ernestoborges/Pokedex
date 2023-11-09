import styled from "styled-components"
import { OptionButton } from "./OptionButton"

export const optionsList = [
    { keyName: "1", option: 0 },
    { keyName: "2", option: 1 },
    { keyName: "3", option: 2 },
    { keyName: "4", option: 3 },
]

export function OptionsButtons() {
    return <>
        <Container>
            {
                optionsList.map((option) =>
                    <OptionButton key={option.option} keyName={option.keyName} option={option.option} />
                )
            }
        </Container>
    </>
}

const Container = styled.div`   
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`