import { useEffect } from "react"
import styled from "styled-components"
import { useCryAudio } from "../../../providers/CryAudioProvider"
import WaveSurfer from "wavesurfer.js"

export function WaveSurferComponent({ pokemonId }: { pokemonId: number }) {

    let {
        wavesurfer,
        setWavesurfer
    } = useCryAudio()!

    function refreshWavesurfer() {
        if (wavesurfer) {
            wavesurfer.destroy()
        }

        let obj = WaveSurfer.create({
            container: "#waveform",
            waveColor: "#cccccc",
            progressColor: "gray",
            barWidth: 3,
            hideScrollbar: true,
            barRadius: 0,
            height: 50,
        })
        const cryUrl = `/audios/cries/${pokemonId}.wav`
        obj.load(cryUrl)
        // @ts-ignore
        setWavesurfer(obj)
    }

    useEffect(() => {
        refreshWavesurfer()
        return () => {
            if (wavesurfer) {
                wavesurfer.destroy()
            }
        }
    }, [pokemonId])

    return <Container>
        <div id="waveform" />
    </Container>
}


const Container = styled.div`
    width: 100%;
    position: relative;

    & > div {
        padding: 1rem;
        width: 100%;
        position: absolute;
        transform: translate(0,-50%);
        pointer-events: none;
    }
`