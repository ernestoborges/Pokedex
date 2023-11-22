import styled from "styled-components"
import { MusicVolumeSwitcher } from "./MusicVolumeSwitcher"
import { EffectVolumeSwitcher } from "./EffectVolumeSwitcher"

export function ControlPainel(){

    return <>
        <Container>
            <MusicVolumeSwitcher />
            <EffectVolumeSwitcher />
        </Container>
    </>
}

const Container = styled.div`
     
`