import styled from "styled-components"
import { Button } from "../Button"
import { useInfoOption } from "../../providers/InfoOptionProvider"
import { BiUpArrow, BiDownArrow, BiRightArrow } from "react-icons/bi"

export function SecondaryOptionsButtons() {

    const { setOption } = useInfoOption()
    return <>
        <Container>
            <Button shape="arrow-up" keyName="ArrowUp" keyLabel={<BiUpArrow />} functionHandler={() => setOption(0)} />
            <Button shape="square" keyName="ArrowRight" keyLabel={<BiRightArrow />} functionHandler={() => setOption(2)} />
            <Button shape="arrow-down" keyName="ArrowDown" keyLabel={<BiDownArrow />} functionHandler={() => setOption(3)} />
        </Container>
    </>
}

const Container = styled.div`
    width: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`