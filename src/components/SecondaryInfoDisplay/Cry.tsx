import styled from "styled-components"
import { useCryAudio } from "../../providers/CryAudioProvider"
import { useEffect, useState } from "react"

export function Cry2ndDisplay() {


    const { playCry, setCryVolume } = useCryAudio()!

    const [volume, setVolume] = useState(0.6)

    useEffect(() => {
        setCryVolume(volume)
    }, [volume])

    return <Container>
        <button onClick={() => playCry()}>play</button>
        <input
            type="range"
            value={volume * 100}
            onChange={
                (e: any) => setVolume(e.target.value / 100)
            }
            min="0"
            max="100"
        />
        {`Volume: ${volume}`}
    </Container>
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    border: 0.1rem solid red;
`